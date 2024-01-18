import { Val } from "../model/value";
import { unifyPi } from "./pi";
import { unifyVar } from "./var";
import { unifyType } from "./type";
import { unifyApp } from "./app";
import { unifyNum } from "./num";
import { unifyFunc } from "./func";
import { ErrorASTMismatch } from "../model/error";

// Attempt to unify x and y, return error if not successful
export function unify(envLen: number, x: Val, y: Val): void {
  if (x.val === y.val) {
    switch (x.val) {
      case 'pi':
        return unifyPi(envLen, x, y as any)
      case 'var':
        return unifyVar(x, y as any)
      case 'app':
        return unifyApp(envLen, x, y as any)
      case 'num':
        return unifyNum(x, y as any)
      case 'func':
        return unifyFunc(envLen, x, y as any)
      case 'any':
        return
      case 'uni':
        return
      case 'type':
        return unifyType(x, y as any)
    }
  } else {
    // TODO recursive resolution
    throw new ErrorASTMismatch()
  }
}
