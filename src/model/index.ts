import { DraftFunction } from "use-immer"
import { listRecord, mapRecord } from "../util"

// Atom type variable, `number`
export type TType = {
  term: 'type',
  type: string,
}

// Atom variable, `x`
export type TVar = {
  term: 'var'
  id: string
}

// Placeholder variable, `_`
export type TAny = {
  term: 'any',
}

// Function intro, `\x => y`
export type TFunc = {
  term: 'func'
  param: Record<string, Term>
  body: Term
}

// Function elim, `(\x => x)(x)`
export type TApp = {
  term: 'app'
  func: Term
  arg: Record<string, Term>
}

// Dependent function type, `(x: X) -> Y`
export type TPi = {
  term: 'pi',
  from: Record<string, Term>
  to: Term
}

// Editable number
export type TNum = {
  term: 'num',
  num: number,
}

// All possible terms
export type Term = TVar | TFunc | TApp | TType | TNum | TAny | TPi

// Atom type, `string`
export type VType = {
  val: 'type',
  type: string,
}

// Function value, `\x => x`
export type VFunc = {
  val: 'func',
  param: Record<string, Val>
  func: Closure
}

// Normalized application, `f(x)`
export type VApp = {
  val: 'app',
  func: Val,
  arg: Record<string, Val>,
}

// Function type, `(x: X) -> Y`
export type VPi = {
  val: 'pi',
  from: Record<string, Val>,
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
}

// All possible values
export type Val = VType | VFunc | VApp | VNum | VAny | VPi | VVar

// Mapping from id to type
export type Ctx = Record<string, Term>

// Mapping from id to value
export type Env = Record<string, Val>

// Closure to avoid HOAS
export type Closure = {
  env: Env,
  body: Term,
}

// Apply a closure
export function apply(closure: Closure, arg: Record<string, Val>) {
  return evaluate({ ...closure.env, ...arg }, closure.body)
}

// Evaluate a term to a value
export function evaluate(env: Env, term: Term): Val {
  switch (term.term) {
    case 'app':
      const func = evaluate(env, term.func)
      const arg = mapRecord(term.arg, (_, t) => evaluate(env, t))
      if (func.val === 'func') {
        return apply(func.func, arg)
      }
      return {
        val: 'app',
        func: func,
        arg: arg,
      }
    case 'func': return {
      val: 'func',
      param: mapRecord(term.param, (_, t) => evaluate(env, t)),
      func: {
        env,
        body: term.body,
      }
    }
    case 'pi': return {
      val: 'pi',
      from: mapRecord(term.from, (_, t) => evaluate(env, t)),
      to: {
        env,
        body: term.to
      }
    }
    case 'var': return env[term.id]
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
export function quote(val: Val): Term {
  switch (val.val) {
    case 'type': return {
      term: 'type',
      type: val.type,
    }
    case 'num': return {
      term: 'num',
      num: val.num,
    }
    case 'func':
      const param = mapRecord(val.param, (_, v) => quote(v))
      const arg = mapRecord(val.param, (id, _) => {
        return {
          val: 'var',
          id,
        } as VVar
      })
      return {
        term: 'func',
        param: param,
        body: quote(apply(val.func, arg))
      }
    case 'var': return {
      term: 'var',
      id: val.id,
    }
    case 'pi':
      const from = mapRecord(val.from, (_, v) => quote(v))
      const piArg = mapRecord(val.from, (id, _) => {
        return {
          val: 'var',
          id,
        } as VVar
      })
      return {
        term: 'pi',
        from: from,
        to: quote(apply(val.to, piArg))
      }
    case 'app': return {
      term: 'app',
      func: quote(val.func),
      arg: mapRecord(val.arg, (_, v) => quote(v)),
    }
    case 'any': return {
      term: 'any',
    }
  }
}

// Pretty-print a term
export function pretty(term: Term): string {
  switch (term.term) {
    case 'func': return `(${listRecord(term.param, (id, t) => `${id}: ${pretty(t)}`).join(', ')}) => ${pretty(term.body)}`
    case 'pi': return `(${listRecord(term.from, (id, t) => `${id}: ${pretty(t)}`).join(', ')}) -> ${pretty(term.to)}`
    case 'app': return `(${pretty(term.func)})(${listRecord(term.arg, (id, t) => `${id} = ${pretty(t)}`).join(', ')})`
    case 'var': return `Var(${term.id})`
    case 'num': return term.num.toString()
    case 'type': return term.type
    case 'any': return '*'
  }
}

// Sample composition
export const sample: Term = {
  term: 'app',
  func: {
    term: 'func',
    param: {
      x: {
        term: 'type',
        type: 'number',
      },
      y: {
        term: 'type',
        type: 'number',
      },
    },
    body: {
      term: 'var',
      id: 'x',
    },
  },
  arg: {
    x: {
      term: 'num',
      num: 0,
    },
    y: {
      term: 'num',
      num: 0,
    },
  }
}

// Props of a rendered component
export type CommonProps<T> = {
  value: T,
  onChange: (updater: DraftFunction<T>) => void,
}
