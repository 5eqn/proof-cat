/*******
  MODEL
 *******/

import { Draft } from "immer"

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

// Placeholder variable, `_`
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

// Placeholder variable
export type VAny = {
  val: 'any',
}

// Variable
export type VVar = {
  val: 'var',
  id: string,
  lvl: number, // de-Bruijn level, 0 is the outermost variable
}

// Thunk value to avoid self reference, `() => ...`, used in recursive eval
export type VRec = {
  val: 'rec',
  thunk: Closure,
}

// Universe type, `U`
export type VUni = {
  val: 'uni'
}

// All possible values
export type Val = VType | VFunc | VApp | VNum | VAny | VPi | VVar | VRec | VUni

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
      // Store body = term.body in env, and evaluate term.next
      return evaluate([{
        val: 'rec',
        thunk: {
          env,
          body: term.body,
        }
      }, ...env], term.next)
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
      const res = env[term.ix]
      if (res.val !== 'rec') {
        return res
      }
      return evaluate([{
        val: 'rec',
        thunk: {
          env: res.thunk.env,
          body: res.thunk.body,
        },
      }, ...res.thunk.env], res.thunk.body)
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
    case 'rec': return val.thunk.body
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
    case 'var': return {
      term: 'var',
      id: val.id,
      ix: len - val.lvl - 1
    }
    case 'pi':
      const from = val.from.map((v) => quote(len, v))
      const piArg = val.fromID.map((id) => ({
        val: 'var',
        id,
      } as Val))
      return {
        term: 'pi',
        from: from,
        fromID: val.fromID,
        to: quote(len + val.fromID.length, apply(val.to, piArg))
      }
    case 'app':
      var core: Term = {
        term: 'app',
        func: quote(len, val.func),
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
        .reduce((x, y) => x || y)
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
        .reduce((x, y) => x || y)
      return occurInFunc || occurInArg
    case 'func':
      const occurInParam = term.param
        .map((t) => hasOccurrence(len, ix, t))
        .reduce((x, y) => x || y)
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
    case 'var': return
    case 'app':
      deleteVar(len, ix, term.func)
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
