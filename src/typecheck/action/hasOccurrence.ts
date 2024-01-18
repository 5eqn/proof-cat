// Does Var(ix) occur in term? (can only be referred in Var or App)
import { ErrorReferredRaw } from "../model/error";
import { TApp, Term, TFunc, TLet, TPi } from "../model/term";

export function assertNotOccur(len: number, ix: number, term: Term): void {
  switch (term.term) {
    case 'func':
    case 'pi':
      return assertInFunc(len, ix, term)
    case 'let':
      return assertInLet(len, ix, term)
    case 'var':
      if (term.ix === ix) throw new ErrorReferredRaw()
      break
    case 'app':
      return assertInApp(len, ix, term)
  }
}

function assertInFunc(len: number, ix: number, term: TPi | TFunc): void {
  term.param.forEach((t: Term) => assertNotOccur(len, ix, t))
  const l: number = term.param.length
  assertNotOccur(len + l, ix + l, term.body)
}

function assertInLet(len: number, ix: number, term: TLet): void {
  assertNotOccur(len, ix, term.body)
  assertNotOccur(len + 1, ix + 1, term.next)
}

function assertInApp(len: number, ix: number, term: TApp): void {
  assertNotOccur(len, ix, term.func)
  term.arg.forEach((t: Term) => assertNotOccur(len, ix, t))
}
