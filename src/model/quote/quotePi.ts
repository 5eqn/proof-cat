import { Term } from "../term";
import { VPi } from "../value";
import { apply } from "../closure";
import { makeSpineIn, quote } from "../evaluate";

// Quote a value to a term
export function quotePi(len: number, val: VPi): Term {
  const from = val.param.map((v) => quote(len, v))
  const piArg = val.paramID.map(makeSpineIn(len + val.paramID.length))
  return {
    term: 'pi',
    param: from,
    paramID: val.paramID,
    body: quote(len + val.paramID.length, apply(val.func, piArg))
  }
}
