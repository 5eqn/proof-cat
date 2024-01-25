import { Term } from "../model/term";
import { VFunc } from "../model/value";
import { apply } from "../model/closure";
import { quote } from "./index";

// Quote a value to a term
export function quoteFunc(len: number, val: VFunc): Term {
  return {
    term: 'func',
    param: quote(len, val.param),
    paramID: val.paramID,
    body: quote(len + val.paramID.length, apply(val.func, { val: 'var', lvl: len }))
  }
}
