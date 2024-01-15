import { makeSpineIn, quote } from "../evaluate";
import { Term } from "../term";
import { VFunc } from "../value";
import { apply } from "../closure";

// Quote a value to a term
export function quoteFunc(len: number, val: VFunc): Term {
  const param = val.param.map((v) => quote(len, v))
  const arg = val.paramID.map(makeSpineIn(len + val.paramID.length))
  return {
    term: 'func',
    param: param,
    paramID: val.paramID,
    body: quote(len + val.paramID.length, apply(val.func, arg))
  }
}
