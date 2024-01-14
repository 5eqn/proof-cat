import {InferRequest, InferResult} from "./model";
import {TFunc} from "../term";
import {Val} from "../value";
import {evaluate, quote} from "../evaluate";
import {hasOccurrence} from "../action/hasOccurrence";
import {message} from "antd";
import {i18n} from "../../i18n";
import {TermParam} from "../../view/TermParam";
import {TermFunc} from "../../view/TermFunc";

import {infer} from "./index";

export function inferFunc(req: InferRequest<TFunc>): InferResult {
    // Construct element for function body
    const {env, ctx, ns, depth, term, onChange} = req
    const len = term.paramID.length + env.length
    const funcVars = term.paramID.map<Val>((id, ix) => ({
        val: 'var',
        id,
        // Params should take up upper region of level
        lvl: len - ix - 1,
    }))
    const funcTypes = term.param.map((t) => evaluate(env, t))
    const {val: bodyVal, element: bodyElement} = infer({
        env: [...funcVars, ...env],
        ctx: [...funcTypes, ...ctx],
        ns: [...term.paramID, ...ns],
        depth: depth + 1,
        term: term.body,
        onChange: (updater) => {
            onChange(draft => {
                updater((draft as TFunc).body)
            })
        },
    })
    // Construct element for params
    const paramInfers = term.param.map((t, i) => infer({
        env, ctx, ns,
        depth: depth + 1,
        term: t,
        onChange: (updater) => {
            if (hasOccurrence(len, i, term.body)) message.error(i18n.err.referred)
            else onChange(draft => {
                updater((draft as TFunc).param[i])
            })
        },
    }))
    const paramElements = paramInfers.map(({element}, i) => TermParam({
        req,
        paramID: term.paramID[i],
        paramIX: i,
        param: element,
        len,
        body: term.body,
    }))
    const paramVals = term.param.map((t) => evaluate(env, t))
    // Construct type for func, which is Pi
    const val: Val = {
        val: 'pi',
        from: paramVals,
        fromID: term.paramID,
        to: {
            env,
            body: quote(len, bodyVal),
        }
    }
    // Concatenate
    return {
        val: val,
        element: TermFunc({
            req,
            type: val,
            params: paramElements,
            body: bodyElement,
        }),
    }
}