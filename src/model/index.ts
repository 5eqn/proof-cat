import { DraftFunction } from "use-immer"

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
  arg: TVar[]
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

// Closure to avoid HOAS
export type Closure = {
  env: Env,
  body: Term,
}

// Apply a closure
export function apply(closure: Closure, arg: Val[]) {
  return evaluate([...arg, ...closure.env], closure.body)
}

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
      const arg = term.arg.map((v) => evaluate(env, v))
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
        arg: val.arg.map((_, i) => ({
          term: 'var',
          id: val.argID[i],
          ix: i,
        })),
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

// Pretty-print a term
export function pretty(term: Term): string {
  switch (term.term) {
    case 'func': return `(${term.param.map((t, i) => `${term.paramID[i]}: ${pretty(t)}`).join(', ')}) => ${pretty(term.body)}`
    case 'pi': return `(${term.from.map((t, i) => `${term.fromID[i]}: ${pretty(t)}`).join(', ')}) -> ${pretty(term.to)}`
    case 'app': return `(${pretty(term.func)})(${term.arg.map((t, i) => `${term.argID[i]} = ${pretty(t)}`).join(', ')})`
    case 'var': return `Var(${term.id})`
    case 'num': return term.num.toString()
    case 'type': return term.type
    case 'any': return '*'
    case 'uni': return 'U'
    case 'let': return `${term.id} = ${pretty(term.body)}; ${pretty(term.next)}`
  }
}

// Catch error in evaluation process
export function wrap(proc: () => string): string {
  try {
    const result = proc()
    return result
  } catch (e) {
    return `Error: ${e}`
  }
}

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
      arg: [
        {
          term: 'var',
          id: 'yys',
          ix: 1,
        },
        {
          term: 'var',
          id: 'wys',
          ix: 0,
        },
      ],
      argID: [
        'x',
        'y',
      ]
    },
  },
}

// Props of a rendered component
export type CommonProps<T> = {
  value: T,
  level: number,
  onChange: (updater: DraftFunction<T>) => void,
}
