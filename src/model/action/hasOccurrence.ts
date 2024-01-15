// Does Var(ix) occur in term? (can only be referred in Var or App)
import { TApp, Term, TFunc, TLet, TPi } from "../term";

export function hasOccurrence(len: number, ix: number, term: Term): boolean {
  switch (term.term) {
    case 'func':
    case 'pi':
      return occurInFunc(len, ix, term)
    case 'let':
      return occurInLet(len, ix, term)
    case 'var':
      return term.ix === ix
    case 'app':
      return occurInApp(len, ix, term)
  }
  return false
}

function occurInFunc(len: number, ix: number, term: TPi | TFunc): boolean {
  const occurInParam: boolean = term.param
    .map((t: Term) => hasOccurrence(len, ix, t))
    .reduce((x: boolean, y: boolean) => x || y, false)
  const l: number = term.param.length
  const occurInFBody: boolean = hasOccurrence(len + l, ix + l, term.body)
  return occurInParam || occurInFBody
}

function occurInLet(len: number, ix: number, term: TLet): boolean {
  const occurInBody: boolean = hasOccurrence(len, ix, term.body)
  const occurInNext: boolean = hasOccurrence(len + 1, ix + 1, term.next)
  return occurInBody || occurInNext
}

function occurInApp(len: number, ix: number, term: TApp): boolean {
  const occurInFunc: boolean = hasOccurrence(len, ix, term.func)
  const occurInArg: boolean = term.argIX
    .map((x: number) => x === ix)
    .reduce((x: boolean, y: boolean) => x || y, false)
  return occurInFunc || occurInArg
}
