// Add Var(ix) in term
import { Draft } from "immer";
import { TApp, Term, TFunc, TLet, TPi, TVar } from "../../model/term";

// ix: de-Bruijn index of the added variable
// size: number of added variables
export function addVar(ix: number, size: number, term: Draft<Term>): void {
  switch (term.term) {
    case 'func':
    case 'pi':
      return addFuncVar(ix, size, term)
    case 'let':
      return addLetVar(ix, size, term)
    case 'var':
      return addVarVar(ix, size, term)
    case 'app':
      return addAppVar(ix, size, term)
  }
}

function addFuncVar(ix: number, size: number, term: Draft<TFunc | TPi>): void {
  for (let i = 0; i < term.param.length; i++)
    addVar(ix, size, term.param[i])
  addVar(ix + term.param.length, size, term.body)
}

function addLetVar(ix: number, size: number, term: Draft<TLet>): void {
  addVar(ix, size, term.body)
  addVar(ix + 1, size, term.next)
}

function addVarVar(ix: number, size: number, term: Draft<TVar>): void {
  if (term.ix >= ix) term.ix += size
}

function addAppVar(ix: number, size: number, term: Draft<TApp>): void {
  addVar(ix, size, term.func)
  for (let i = 0; i < term.arg.length; i++)
    addVar(ix, size, term.arg[i])
}
