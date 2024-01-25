import { Term } from "../model/term";
import { VPi } from "../model/value";
import { apply } from "../model/closure";
import { quote } from "./index";

// Quote a value to a term
export function quotePi(len: number, val: VPi): Term {
  return {
    term: 'pi',
    param: quote(len, val.param),
    paramID: val.paramID,
    body: quote(len + val.paramID.length, apply(val.func, { val: 'var', lvl: len }))
  }
}
