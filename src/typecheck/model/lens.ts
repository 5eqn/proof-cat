// Recursion structure of term
import { ErrorInvalidLens } from "./error"

export type RPi = {
  term: 'pi',
  param: Rec,
  body: Rec,
}

export type RFunc = {
  term: 'func',
  param: Rec,
  body: Rec,
}

export type RApp = {
  term: 'app',
  arg: Rec,
  func: Rec,
}

export type RLet = {
  term: 'let',
  body: Rec,
  next: Rec,
}

export type ROther = {
  term: 'var' | 'num' | 'uni' | 'type' | 'any',
}

export type Rec = RFunc | RPi | RApp | RLet | ROther

export type Lens = string[]

export function applyLens<T extends Rec>(rec: T, lens: Lens, ptr: number = 0): T {
  if (lens.length === ptr) return rec
  const fst = lens[ptr]
  switch (rec.term) {
    case 'func':
    case 'pi':
      // Reason for casting: there's no recursion schemes in Typescript
      if (fst === 'param') return applyLens(rec.param, lens, ptr + 1) as T
      if (fst === 'body') return applyLens(rec.body, lens, ptr + 1) as T
      throw new ErrorInvalidLens()
    case 'app':
      if (fst === 'arg') return applyLens(rec.arg, lens, ptr + 1) as T
      if (fst === 'func') return applyLens(rec.func, lens, ptr + 1) as T
      throw new ErrorInvalidLens()
    case 'let':
      if (fst === 'body') return applyLens(rec.body, lens, ptr + 1) as T
      if (fst === 'next') return applyLens(rec.next, lens, ptr + 1) as T
      throw new ErrorInvalidLens()
    default:
      throw new ErrorInvalidLens()
  }
}

export function joinLens(lens: Lens): string {
  return lens.join('.')
}

export function splitLens(joined: string): Lens {
  const lens: Lens = joined.split('.')
  if (lens.length === 1 && lens[0] === '') return []
  else return lens
}
