/*******
  MODEL
 *******/

import { Draft } from "immer"
import { i18n } from "../i18n"

// Atom type variable, `number`
export type TType = {
  term: 'type',
  type: string,
}

// Atom variable, `x`
export type TVar = {
  term: 'var'
  id: string
  ix: number, // de-Bruijn index, 0 is the most recent variable
}

// Arbitrary value or type, `any`
export type TAny = {
  term: 'any',
}

// Function intro, `\x => y`
export type TFunc = {
  term: 'func'
  param: Term[]
  paramID: string[]
  body: Term
}

// Function elim, `(\x => x)(x)`
export type TApp = {
  term: 'app'
  func: Term
  argIX: number[]
  argID: string[]
}

// Let bind, `let id = body in next`
export type TLet = {
  term: 'let',
  id: string,
  body: Term,
  next: Term,
}

// Dependent function type, `(x: X) -> Y`
export type TPi = {
  term: 'pi',
  from: Term[]
  fromID: string[]
  to: Term
}

// Universe type, `U`
export type TUni = {
  term: 'uni',
}

// Editable number
export type TNum = {
  term: 'num',
  num: number,
}

// All possible terms
export type Term = TVar | TFunc | TApp | TType | TNum | TAny | TPi | TLet | TUni

// Atom type, `string`
export type VType = {
  val: 'type',
  type: string,
}

// Function value, `\x => x`
export type VFunc = {
  val: 'func',
  param: Val[],
  paramID: string[],
  func: Closure
}

// Normalized application, `f(x)`
export type VApp = {
  val: 'app',
  func: Val,
  arg: Val[],
  argID: string[],
}

// Function type, `(x: X) -> Y`
export type VPi = {
  val: 'pi',
  from: Val[],
  fromID: string[],
  to: Closure,
}

// Editable number
export type VNum = {
  val: 'num',
  num: number,
}

// Arbitrary type or value
export type VAny = {
  val: 'any',
}

// Variable
export type VVar = {
  val: 'var',
  id: string,
  lvl: number, // de-Bruijn level, 0 is the outermost variable
}

// Universe type, `U`
export type VUni = {
  val: 'uni'
}

// All possible values
export type Val = VType | VFunc | VApp | VNum | VAny | VPi | VVar | VUni

// Mapping from id to value
export type Env = Val[]

// Mapping from id to type
export type Ctx = Val[]

// Closure to avoid HOAS
export type Closure = {
  env: Env,
  body: Term,
}

// Apply a closure
export function apply(closure: Closure, arg: Val[]) {
  return evaluate([...arg, ...closure.env], closure.body)
}

/*************
  UNIFICATION
 *************/

// Attempt to unify x and y, return error if not successful
export function unify(len: number, x: Val, y: Val): string | null {
  if (x.val === y.val) {
    switch (x.val) {
      case 'pi':
        const piY = y as VPi
        const piLen = x.from.length
        if (piLen !== piY.from.length)
          return i18n.err.fromLenMismatch(piLen, piY.from.length)
        for (let i = 0; i < piLen; i++) {
          const res = unify(len, x.from[i], piY.from[i])
          if (res !== null) return res
        }
        const piArgs = x.fromID.map<VVar>((id, i) => ({
          val: 'var',
          id: id,
          lvl: len + piLen - i - 1
        }))
        const piToRes = unify(
          len + piLen,
          apply(x.to, piArgs),
          apply(piY.to, piArgs),
        )
        return piToRes
      case 'var':
        return x.lvl === (y as VVar).lvl ? null : i18n.err.variableMismatch(
          x.id, (y as VVar).id,
          x.lvl, (y as VVar).lvl
        )
      case 'app':
        const appY = y as VApp
        const appLen = x.arg.length
        if (appLen !== appY.arg.length)
          return i18n.err.argLenMismatch(appLen, appY.arg.length)
        for (let i = 0; i < appLen; i++) {
          const res = unify(len, x.arg[i], appY.arg[i])
          if (res !== null) return res
        }
        return unify(len, x.func, appY.func)
      case 'num':
        return x.num === (y as VNum).num ? null
          : i18n.err.numMismatch(x.num, (y as VNum).num)
      case 'func':
        const funcY = y as VFunc
        const funcLen = x.param.length
        if (funcLen !== funcY.param.length)
          return i18n.err.fromLenMismatch(funcLen, funcY.param.length)
        for (let i = 0; i < funcLen; i++) {
          const res = unify(len, x.param[i], funcY.param[i])
          if (res !== null) return res
        }
        const funcArgs = x.paramID.map<VVar>((id, i) => ({
          val: 'var',
          id: id,
          lvl: len + funcLen - i - 1
        }))
        const funcRes = unify(
          len + funcLen,
          apply(x.func, funcArgs),
          apply(funcY.func, funcArgs),
        )
        return funcRes
      case 'any': return null
      case 'uni': return null
      case 'type':
        return x.type === (y as VType).type ? null
          : i18n.err.typeMismatch(x.type, (y as VType).type)
    }
  } else {
    // TODO recursive resolution
    return i18n.err.astMismatch(x.val, y.val)
  }
}

/************
  EVALUATION 
 ************/

// Evaluate a term to a value
export function evaluate(env: Env, term: Term): Val {
  switch (term.term) {
    case 'uni': return {
      val: 'uni',
    }
    case 'let':
      const body = evaluate(env, term.body)
      return evaluate([body, ...env], term.next)
    case 'app':
      const func = evaluate(env, term.func)
      const arg = term.argIX.map((ix, i) => evaluate(env, {
        term: 'var',
        id: term.argID[i],
        ix: ix
      }))
      if (func.val === 'func') {
        return apply(func.func, arg)
      }
      return {
        val: 'app',
        func: func,
        arg: arg,
        argID: term.argID,
      }
    case 'func': return {
      val: 'func',
      param: term.param.map((t) => evaluate(env, t)),
      paramID: term.paramID,
      func: {
        env,
        body: term.body,
      }
    }
    case 'pi': return {
      val: 'pi',
      from: term.from.map((t) => evaluate(env, t)),
      fromID: term.fromID,
      to: {
        env,
        body: term.to
      }
    }
    case 'var':
      return env[term.ix]
    case 'num': return {
      val: 'num',
      num: term.num
    }
    case 'type': return {
      val: 'type',
      type: term.type,
    }
    case 'any': return {
      val: 'any',
    }
  }
}

// Quote a value to a term
export function quote(len: number, val: Val): Term {
  switch (val.val) {
    case 'uni': return {
      term: 'uni',
    }
    case 'type': return {
      term: 'type',
      type: val.type,
    }
    case 'num': return {
      term: 'num',
      num: val.num,
    }
    case 'func':
      const param = val.param.map((v) => quote(len, v))
      const arg = val.paramID.map((id) => ({
        val: 'var',
        id,
      } as Val))
      return {
        term: 'func',
        param: param,
        paramID: val.paramID,
        body: quote(len + val.paramID.length, apply(val.func, arg))
      }
    case 'var':
      return {
        term: 'var',
        id: val.id,
        ix: len - val.lvl - 1
      }
    case 'pi':
      const from = val.from.map((v) => quote(len, v))
      // Level is calculated by total variable count - new variable index - 1
      const piArg = val.fromID.map((id, ix) => ({
        val: 'var',
        id,
        lvl: len + val.fromID.length - ix - 1,
      } as VVar))
      return {
        term: 'pi',
        from: from,
        fromID: val.fromID,
        to: quote(len + val.fromID.length, apply(val.to, piArg))
      }
    case 'app':
      // Quote length is appended by length of argID because auxillary Let is added
      var core: Term = {
        term: 'app',
        func: quote(len + val.argID.length, val.func),
        argIX: val.arg.map((_, i) => i),
        argID: val.argID,
      }
      // Innermost variable is arg[0], which will have de-Bruijn index 0
      val.arg.forEach((v, i) => {
        core = {
          term: 'let',
          id: val.argID[i],
          body: quote(len, v),
          next: core
        }
      })
      return core
    case 'any': return {
      term: 'any',
    }
  }
}

/*************
  CODE-ACTION
 *************/

// Does Var(ix) occur in term? (can only be referred in Var or App)
export function hasOccurrence(len: number, ix: number, term: Term): boolean {
  switch (term.term) {
    case 'pi':
      const occurInFrom = term.from
        .map((t) => hasOccurrence(len, ix, t))
        .reduce((x, y) => x || y, false)
      const l = term.from.length
      const occurInTo = hasOccurrence(len + l, ix + l, term.to)
      return occurInFrom || occurInTo
    case 'let':
      const occurInBody = hasOccurrence(len + 1, ix + 1, term.body)
      const occurInNext = hasOccurrence(len + 1, ix + 1, term.next)
      return occurInBody || occurInNext
    case 'var': return term.ix === ix
    case 'app':
      const occurInFunc = hasOccurrence(len, ix, term.func)
      const occurInArg = term.argIX
        .map((x) => x === ix)
        .reduce((x, y) => x || y, false)
      return occurInFunc || occurInArg
    case 'func':
      const occurInParam = term.param
        .map((t) => hasOccurrence(len, ix, t))
        .reduce((x, y) => x || y, false)
      const fl = term.param.length
      const occurInFBody = hasOccurrence(len + fl, ix + fl, term.body)
      return occurInParam || occurInFBody
    case 'num': return false
    case 'any': return false
    case 'type': return false
    case 'uni': return false
  }
}

// Delete Var(ix) in term (should only be called when no occurence)
export function deleteVar(len: number, ix: number, term: Draft<Term>) {
  switch (term.term) {
    case 'pi':
      term.from.forEach((t) => deleteVar(len, ix, t))
      deleteVar(len + term.from.length, ix + term.from.length, term.to)
      return
    case 'let':
      deleteVar(len + 1, ix + 1, term.body)
      deleteVar(len + 1, ix + 1, term.next)
      return
    case 'var':
      // Subtract index if the index will fall after deletion
      if (term.ix > ix) term.ix--
      return
    case 'app':
      deleteVar(len, ix, term.func)
      term.argIX.forEach((t, i) => {
        if (t > ix) term.argIX[i]--
      })
      return
    case 'func':
      term.param.forEach((t) => deleteVar(len, ix, t))
      deleteVar(len + term.param.length, ix + term.param.length, term.body)
      return
    case 'num': return
    case 'any': return
    case 'type': return
    case 'uni': return
  }
}

/**************
  PRETTY-PRINT
 **************/

// Pretty-print a term
export function pretty(ns: string[], term: Term): string {
  switch (term.term) {
    case 'func': return `(${term.param.map((t, i) => `${term.paramID[i]}: ${pretty(ns, t)}`).join(', ')}) => ${pretty([...term.paramID, ...ns], term.body)}`
    case 'pi': return `(${term.from.map((t, i) => `${term.fromID[i]}: ${pretty(ns, t)}`).join(', ')}) -> ${pretty([...term.fromID, ...ns], term.to)}`
    case 'app': return `(${pretty(ns, term.func)})(${term.argIX.map((ix, i) => `${term.argID[i]} = ${ns[ix]}`).join(', ')})`
    case 'var': return `${term.id}`
    case 'num': return term.num.toString()
    case 'type': return term.type
    case 'any': return '*'
    case 'uni': return 'U'
    case 'let': return `${term.id} = ${pretty([term.id, ...ns], term.body)}; ${pretty([term.id, ...ns], term.next)}`
  }
}

/********
  SAMPLE
 ********/

// Sample composition
export const sample: Term = {
  term: 'let',
  id: 'yys',
  body: {
    term: 'num',
    num: 114,
  },
  next: {
    term: 'let',
    id: 'wys',
    body: {
      term: 'num',
      num: 514,
    },
    next: {
      term: 'app',
      func: {
        term: 'func',
        param: [
          {
            term: 'type',
            type: 'number',
          },
          {
            term: 'type',
            type: 'number',
          },
        ],
        paramID: [
          'x',
          'y',
        ],
        body: {
          term: 'var',
          id: 'x',
          ix: 0
        },
      },
      argIX: [1, 0],
      argID: [
        'x',
        'y',
      ]
    },
  },
}
