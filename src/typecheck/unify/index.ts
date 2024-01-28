import { Val, VApp, VFunc, VNum, VPi, VType, VVar } from "../model/value";
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
        // Reason for casting: equality check does not narrow types
        // https://github.com/microsoft/TypeScript/issues/51454
        return unifyPi(envLen, x, y as VPi)
      case 'var':
        return unifyVar(x, y as VVar)
      case 'app':
        return unifyApp(envLen, x, y as VApp)
      case 'num':
        return unifyNum(x, y as VNum)
      case 'func':
        return unifyFunc(envLen, x, y as VFunc)
      case 'any':
        return
      case 'uni':
        return
      case 'type':
        return unifyType(x, y as VType)
    }
  } else if (x.val !== 'any' && y.val !== 'any') {
    throw new ErrorASTMismatch()
  }
}
