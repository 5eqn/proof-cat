// Add Var(ix) in term
import { Draft } from "immer";
import { TApp, Term, TFunc, TLet, TPi, TVar } from "../model/term";

export function addVar(ix: number, term: Draft<Term>): void {
  switch (term.term) {
    case 'func':
    case 'pi':
      return addFuncVar(ix, term)
    case 'let':
      return addLetVar(ix, term)
    case 'var':
      return addVarVar(ix, term)
    case 'app':
      return addAppVar(ix, term)
  }
}

function addFuncVar(ix: number, term: Draft<TFunc | TPi>): void {
  for (let i = 0; i < term.param.length; i++)
    addVar(ix, term.param[i])
  addVar(ix + term.param.length, term.body)
}

function addLetVar(ix: number, term: Draft<TLet>): void {
  addVar(ix, term.body)
  addVar(ix + 1, term.next)
}

function addVarVar(ix: number, term: Draft<TVar>): void {
  if (term.ix >= ix) term.ix++
}

function addAppVar(ix: number, term: Draft<TApp>): void {
  addVar(ix, term.func)
  for (let i = 0; i < term.argIX.length; i++)
    if (term.argIX[i] >= ix)
      term.argIX[i]++
}
