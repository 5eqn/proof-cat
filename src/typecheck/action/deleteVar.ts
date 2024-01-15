// Delete Var(ix) in term
// len: length of env before deletion
import { Draft } from "immer";
import { TApp, Term, TFunc, TLet, TPi, TVar } from "../model/term";

export function deleteVar(ix: number, term: Draft<Term>): void {
  switch (term.term) {
    case 'func':
    case 'pi':
      return deleteFuncVar(ix, term)
    case 'let':
      return deleteLetVar(ix, term)
    case 'var':
      return deleteVarVar(ix, term)
    case 'app':
      return deleteAppVar(ix, term)
  }
}

function deleteFuncVar(ix: number, term: Draft<TFunc | TPi>): void {
  for (let i = 0; i < term.param.length; i++)
    deleteVar(ix, term.param[i])
  deleteVar(ix + term.param.length, term.body)
}

function deleteLetVar(ix: number, term: Draft<TLet>): void {
  deleteVar(ix, term.body)
  deleteVar(ix + 1, term.next)
}

function deleteVarVar(ix: number, term: Draft<TVar>): void {
  if (term.ix > ix) term.ix--
}

function deleteAppVar(ix: number, term: Draft<TApp>): void {
  deleteVar(ix, term.func)
  for (let i = 0; i < term.argIX.length; i++)
    if (term.argIX[i] > ix)
      term.argIX[i]--
}

