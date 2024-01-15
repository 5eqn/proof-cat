/************
 EVALUATION
 ************/
import { Env } from "./env";
import { Term } from "./term";
import { Val, VVar } from "./value";
import { apply } from "./closure";

// Evaluate a term to a value
export function evaluate(env: Env, term: Term): Val {
  switch (term.term) {
    case 'uni':
      return {
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
    case 'func':
      return {
        val: 'func',
        param: term.param.map((t) => evaluate(env, t)),
        paramID: term.paramID,
        func: {
          env,
          body: term.body,
        }
      }
    case 'pi':
      return {
        val: 'pi',
        from: term.param.map((t) => evaluate(env, t)),
        fromID: term.paramID,
        to: {
          env,
          body: term.body
        }
      }
    case 'var':
      return env[term.ix]
    case 'num':
      return {
        val: 'num',
        num: term.num
      }
    case 'type':
      return {
        val: 'type',
        type: term.type,
      }
    case 'any':
      return {
        val: 'any',
      }
  }
}

// Quote a value to a term
export function quote(len: number, val: Val): Term {
  switch (val.val) {
    case 'uni':
      return {
        term: 'uni',
      }
    case 'type':
      return {
        term: 'type',
        type: val.type,
      }
    case 'num':
      return {
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
        param: from,
        paramID: val.fromID,
        body: quote(len + val.fromID.length, apply(val.to, piArg))
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
    case 'any':
      return {
        term: 'any',
      }
  }
}
