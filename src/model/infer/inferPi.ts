import {InferRequest, InferResult} from "./model";
import {TPi} from "../term";
import {Val} from "../value";
import {evaluate} from "../evaluate";
import {hasOccurrence} from "../action/hasOccurrence";
import {message} from "antd";
import {i18n} from "../../i18n";
import {TermFrom} from "../../view/TermFrom";
import {TermPi} from "../../view/TermPi";

import {infer} from "./index";

export function inferPi(req: InferRequest<TPi>): InferResult {
    // Construct element for to type
    const {env, ctx, ns, depth, term, onChange} = req
    const len = term.fromID.length + env.length
    const piVars = term.fromID.map<Val>((id, ix) => ({
        val: 'var',
        id,
        lvl: len - ix - 1,
    }))
    const piTypes = term.from.map((t) => evaluate(env, t))
    const {element: toElement} = infer({
        env: [...piVars, ...env],
        ctx: [...piTypes, ...ctx],
        ns: [...term.fromID, ...ns],
        depth: depth + 1,
        term: term.to,
        onChange: (updater) => {
            onChange(draft => {
                updater((draft as TPi).to)
            })
        },
    })
    // Construct element for from types
    const fromInfers = term.from.map((t, i) => infer({
        env, ctx, ns,
        depth: depth + 1,
        term: t,
        onChange: (updater) => {
            if (hasOccurrence(len, i, term.to)) message.error(i18n.err.referred)
            else onChange(draft => {
                updater((draft as TPi).from[i])
            })
        },
    }))
    const fromElements = fromInfers.map(({element}, i) => TermFrom({
        req,
        fromID: term.fromID[i],
        fromIX: i,
        from: element,
        len,
        to: term.to,
    }))
    // Construct type for pi, which is always U
    const val: Val = {
        val: 'uni',
    }
    // Concatenate
    return {
        val: val,
        element: TermPi({
            req,
            type: val,
            froms: fromElements,
            to: toElement,
        }),
    }
}