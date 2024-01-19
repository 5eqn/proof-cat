import { Term } from "../model/term";
import { VFunc } from "../model/value";
import { apply } from "../model/closure";
import {quote} from "./index";
import {makeSpineIn} from "../action/helper/makeSpineIn";

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
