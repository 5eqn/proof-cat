/*************
 UNIFICATION
 *************/
import { Val } from "./value";
import { i18n } from "../i18n";
import { unifyPi } from "./unify/pi";
import { unifyVar } from "./unify/var";
import { unifyType } from "./unify/type";
import { unifyApp } from "./unify/app";
import { unifyNum } from "./unify/num";
import { unifyFunc } from "./unify/func";

// Attempt to unify x and y, return error if not successful
export function unify(len: number, x: Val, y: Val): string | null {
  if (x.val === y.val) {
    switch (x.val) {
      case 'pi':
        return unifyPi(len, x, y as any)
      case 'var':
        return unifyVar(x, y as any)
      case 'app':
        return unifyApp(len, x, y as any)
      case 'num':
        return unifyNum(x, y as any)
      case 'func':
        return unifyFunc(len, x, y as any)
      case 'any':
        return null
      case 'uni':
        return null
      case 'type':
        return unifyType(x, y as any)
    }
  } else {
    // TODO recursive resolution
    return i18n.err.astMismatch(x.val, y.val)
  }
}
