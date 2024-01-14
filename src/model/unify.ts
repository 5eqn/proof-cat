/*************
 UNIFICATION
 *************/
import {Val, VApp, VFunc, VNum, VPi, VType, VVar} from "./value";
import {i18n} from "../i18n";
import {apply} from "./closure";

// Attempt to unify x and y, return error if not successful
export function unify(len: number, x: Val, y: Val): string | null {
    if (x.val === y.val) {
        switch (x.val) {
            case 'pi':
                const piY = y as VPi
                const piLen = x.from.length
                if (piLen !== piY.from.length)
                    return i18n.err.fromLenMismatch(piLen, piY.from.length)
                for (let i = 0; i < piLen; i++) {
                    const res = unify(len, x.from[i], piY.from[i])
                    if (res !== null) return res
                }
                const piArgs = x.fromID.map<VVar>((id, i) => ({
                    val: 'var',
                    id: id,
                    lvl: len + piLen - i - 1
                }))
                const piToRes = unify(
                    len + piLen,
                    apply(x.to, piArgs),
                    apply(piY.to, piArgs),
                )
                return piToRes
            case 'var':
                return x.lvl === (y as VVar).lvl ? null : i18n.err.variableMismatch(
                    x.id, (y as VVar).id,
                    x.lvl, (y as VVar).lvl
                )
            case 'app':
                const appY = y as VApp
                const appLen = x.arg.length
                if (appLen !== appY.arg.length)
                    return i18n.err.argLenMismatch(appLen, appY.arg.length)
                for (let i = 0; i < appLen; i++) {
                    const res = unify(len, x.arg[i], appY.arg[i])
                    if (res !== null) return res
                }
                return unify(len, x.func, appY.func)
            case 'num':
                return x.num === (y as VNum).num ? null
                    : i18n.err.numMismatch(x.num, (y as VNum).num)
            case 'func':
                const funcY = y as VFunc
                const funcLen = x.param.length
                if (funcLen !== funcY.param.length)
                    return i18n.err.fromLenMismatch(funcLen, funcY.param.length)
                for (let i = 0; i < funcLen; i++) {
                    const res = unify(len, x.param[i], funcY.param[i])
                    if (res !== null) return res
                }
                const funcArgs = x.paramID.map<VVar>((id, i) => ({
                    val: 'var',
                    id: id,
                    lvl: len + funcLen - i - 1
                }))
                const funcRes = unify(
                    len + funcLen,
                    apply(x.func, funcArgs),
                    apply(funcY.func, funcArgs),
                )
                return funcRes
            case 'any':
                return null
            case 'uni':
                return null
            case 'type':
                return x.type === (y as VType).type ? null
                    : i18n.err.typeMismatch(x.type, (y as VType).type)
        }
    } else {
        // TODO recursive resolution
        return i18n.err.astMismatch(x.val, y.val)
    }
}