import { quote } from "../evaluate";
import { Term } from "../model/term";
import { VApp } from "../model/value";

// Quote a value to a term
export function quoteApp(len: number, val: VApp): Term {
  // Quote length is appended by length of argID because auxillary Let is added
  var core: Term = {
    term: 'app',
    func: quote(len + val.argID.length, val.func),
    argIX: val.arg.map((_, i) => i),
    argID: val.argID,
  }
  // Innermost variable is arg[0], which will have de-Bruijn index 0
  val.arg.forEach((v, i) => {
    core = {
      term: 'let',
      id: val.argID[i],
      body: quote(len, v),
      next: core
    }
  })
  return core
}
