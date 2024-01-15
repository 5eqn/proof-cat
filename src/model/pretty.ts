/**************
 PRETTY-PRINT
 **************/
import { TApp, Term, TFunc, TLet, TPi } from "./term";

// Pretty-print a term
export function pretty(ns: string[], term: Term): string {
  switch (term.term) {
    case 'func':
      return prettyFunc(ns, term)
    case 'pi':
      return prettyPi(ns, term)
    case 'app':
      return prettyApp(ns, term)
    case 'let':
      return prettyLet(ns, term)
    case 'var':
      return `${term.id}_${term.ix}`
    case 'num':
      return term.num.toString()
    case 'type':
      return term.type
    case 'any':
      return '*'
    case 'uni':
      return 'U'
  }
}

function prettyFunc(ns: string[], term: TFunc): string {
  return `(${term.param.map((t, i) => `${term.paramID[i]}: ${pretty(ns, t)}`).join(', ')}) => ${pretty([...term.paramID, ...ns], term.body)}`
}

function prettyPi(ns: string[], term: TPi): string {
  return `(${term.param.map((t, i) => `${term.paramID[i]}: ${pretty(ns, t)}`).join(', ')}) -> ${pretty([...term.paramID, ...ns], term.body)}`
}

function prettyApp(ns: string[], term: TApp): string {
  return `(${pretty(ns, term.func)})(${term.argIX.map((ix, i) => `${term.argID[i]} = ${ns[ix]}_${ix}`).join(', ')})`
}

function prettyLet(ns: string[], term: TLet): string {
  return `${term.id} = ${pretty([term.id, ...ns], term.body)}; ${pretty([term.id, ...ns], term.next)}`
}
