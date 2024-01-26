import { TApp, Term, TFunc, TLet, TPi } from "../model/term";

// Pretty-print a term
export function pretty(ns: string[], term: Term, applied: boolean = false): string {
  switch (term.term) {
    case 'func':
      return paren(applied, prettyFunc(ns, term))
    case 'pi':
      return paren(applied, prettyPi(ns, term))
    case 'app':
      return prettyApp(ns, term)
    case 'let':
      return paren(applied, prettyLet(ns, term))
    case 'var':
      return `${ns[term.ix]}`
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

// Pretty-print a term
export function prettyStep(ns: string[], term: Term): string {
  switch (term.term) {
    case 'func':
      return 'f'
    case 'pi':
      return '->'
    case 'app':
      return prettyApp(ns, term)
    case 'let':
      return '-'
    case 'var':
      return `${ns[term.ix]}`
    case 'num':
      return term.num.toString()
    case 'type':
      return term.type
    case 'any':
      return ''
    case 'uni':
      return 'U'
  }
}

function paren(use: boolean, inner: string): string {
  return use ? `(${inner})` : inner
}

function prettyFunc(ns: string[], term: TFunc): string {
  return `(${term.paramID}: ${pretty(ns, term.param)}) => ${pretty([term.paramID, ...ns], term.body)}`
}

function prettyPi(ns: string[], term: TPi): string {
  return `(${term.paramID}: ${pretty(ns, term.param)}) -> ${pretty([term.paramID, ...ns], term.body)}`
}

function prettyApp(ns: string[], term: TApp): string {
  return `${pretty(ns, term.func, true)}(${pretty(ns, term.arg)})`
}

function prettyLet(ns: string[], term: TLet): string {
  return `let ${term.id} = ${pretty([term.id, ...ns], term.body)} in ${pretty([term.id, ...ns], term.next)}`
}
