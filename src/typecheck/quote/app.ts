import { Term } from "../model/term";
import { VApp } from "../model/value";
import { quote } from "./index";

// Quote a value to a term
export function quoteApp(len: number, val: VApp): Term {
  // Get the count of let needed
  let cnt = 0
  for (let i = 0; i < val.arg.length; i++) {
    if (val.arg[i].val !== 'var') cnt++;
  }
  // Construct arg index from arguments, non-variable needs let
  let argIX: number[] = []
  let ix = 0
  for (let i = 0; i < val.arg.length; i++) {
    const v = val.arg[i]
    if (v.val === 'var') argIX.push(len + cnt - v.lvl - 1)
    else argIX.push(ix++)
  }
  // Quote length is appended by length of argID because auxillary Let is added
  let core: Term = {
    term: 'app',
    func: quote(len + cnt, val.func),
    argIX: argIX,
    argID: val.argID,
  }
  // Innermost variable is arg[0], which will have de-Bruijn index 0
  val.arg.forEach((v, i) => {
    if (v.val === 'var') return
    core = {
      term: 'let',
      id: val.argID[i],
      body: quote(len, v),
      next: core
    }
  })
  return core
}
