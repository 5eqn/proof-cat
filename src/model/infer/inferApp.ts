import {InferRequest, InferResult} from "./model";
import {TApp} from "../term";
import {message} from "antd";
import {i18n} from "../../i18n";
import {evaluate} from "../evaluate";
import {VPi} from "../value";
import {apply} from "../closure";
import {TermArg} from "../../view/TermArg";
import {TermApp} from "../../view/TermApp";

import {infer} from "./index";

export function inferApp(req: InferRequest<TApp>): InferResult {
    // Get type from function's Pi type's destination type
    const {env, ctx, ns, depth, term} = req
    const {val: appFuncVal, element: funcElement} = infer({
        env, ctx, ns,
        depth: depth + 1,
        term: term.func,
        onChange: (_) => {
            // Applied term should not change
            message.error(i18n.err.changeApply)
        }
    })
    const argVals = term.argIX.map((ix, i) => evaluate(env, {
        term: 'var',
        id: term.argID[i],
        ix: ix
    }))
    const appFuncPi = appFuncVal as VPi
    const val = apply(appFuncPi.to, argVals)
    // Generate argument elements
    const argElements = term.argIX.map((globalIX, argIX) => TermArg({
        req, globalIX, argIX,
        type: appFuncPi.from[argIX],
        paramID: appFuncPi.fromID[argIX],
    }))
    return {
        val: val,
        element: TermApp({
            req,
            type: val,
            args: argElements,
            func: funcElement,
        }),
    }
}