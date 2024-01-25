import { Term } from "../model/term";
import { VApp } from "../model/value";
import { quote } from "./index";

// Quote a value to a term
export function quoteApp(len: number, val: VApp): Term {
  return {
    term: 'app',
    func: quote(len, val.func),
    arg: quote(len, val.arg),
  }
}
