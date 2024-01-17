import { Term } from "../model/term";
import { VApp } from "../model/value";
import { quote } from "./index";

// Quote a value to a term
export function quoteApp(len: number, val: VApp): Term {
  const arg = val.arg.map((v) => quote(len, v))
  const result: Term = {
    term: 'app',
    func: quote(len, val.func),
    arg: arg,
    argID: val.argID,
  }
  return result
}
