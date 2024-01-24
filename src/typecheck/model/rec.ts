// Recursion structure of term
import { Lens } from "./action"
import { ErrorInvalidLens } from "./error"

export type RPi = {
  term: 'pi',
  param: Rec[],
  body: Rec,
}

export type RFunc = {
  term: 'func',
  param: Rec[],
  body: Rec,
}

export type RApp = {
  term: 'app',
  arg: Rec[],
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

export function applyLens<T extends Rec>(rec: T, lens: Lens, ptr: number = 0): T {
  if (lens.length === ptr) return rec
  const fst = lens[ptr]
  const snd = +lens[ptr + 1]
  switch (rec.term) {
    case 'func':
    case 'pi':
      if (fst === 'param') return applyLens(rec.param[snd], lens, ptr + 2) as T
      if (fst === 'body') return applyLens(rec.body, lens, ptr + 1) as T
      throw new ErrorInvalidLens()
    case 'app':
      if (fst === 'arg') return applyLens(rec.arg[snd], lens, ptr + 2) as T
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
  return 'L' + lens.join('.')
}

export function splitLens(joined: string): Lens {
  const lens: Lens = joined.substring(1).split('.')
  if (lens.length === 1 && lens[0] === '') return []
  else return lens
}
