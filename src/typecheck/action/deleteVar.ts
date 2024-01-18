// Delete Var(ix) in term
import { Draft } from "immer";
import { TApp, Term, TFunc, TLet, TPi, TVar } from "../model/term";

export function deleteVar(ix: number, size: number, term: Draft<Term>): void {
  switch (term.term) {
    case 'func':
    case 'pi':
      return deleteFuncVar(ix, size, term)
    case 'let':
      return deleteLetVar(ix, size, term)
    case 'var':
      return deleteVarVar(ix, size, term)
    case 'app':
      return deleteAppVar(ix, size, term)
  }
}

function deleteFuncVar(ix: number, size: number, term: Draft<TFunc | TPi>): void {
  for (let i = 0; i < term.param.length; i++)
    deleteVar(ix, size, term.param[i])
  deleteVar(ix + term.param.length, size, term.body)
}

function deleteLetVar(ix: number, size: number, term: Draft<TLet>): void {
  deleteVar(ix, size, term.body)
  deleteVar(ix + 1, size, term.next)
}

function deleteVarVar(ix: number, size: number, term: Draft<TVar>): void {
  if (term.ix > ix) term.ix -= size
}

function deleteAppVar(ix: number, size: number, term: Draft<TApp>): void {
  deleteVar(ix, size, term.func)
  for (let i = 0; i < term.arg.length; i++)
    deleteVar(ix, size, term.arg[i])
}

