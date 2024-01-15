import { InferRequest, InferResult } from "./model";
import { TPi } from "../term";
import { Val } from "../value";
import { evaluate } from "../evaluate";
import { hasOccurrence } from "../action/hasOccurrence";
import { message } from "antd";
import { i18n } from "../../i18n";
import { TermFrom } from "../../view/TermFrom";
import { TermPi } from "../../view/TermPi";

import { infer } from "./index";

export function inferPi(req: InferRequest<TPi>): InferResult {
  // Construct element for to type
  const { env, ctx, ns, depth, term, onChange } = req
  const len = term.paramID.length + env.length
  const piVars = term.paramID.map<Val>((id, ix) => ({
    val: 'var',
    id,
    lvl: len - ix - 1,
  }))
  const piTypes = term.param.map((t) => evaluate(env, t))
  const { element: toElement } = infer({
    env: [...piVars, ...env],
    ctx: [...piTypes, ...ctx],
    ns: [...term.paramID, ...ns],
    depth: depth + 1,
    term: term.body,
    onChange: (updater) => {
      onChange(draft => {
        updater((draft as TPi).body)
      })
    },
  })
  // Construct element for from types
  const fromInfers = term.param.map((t, i) => infer({
    env, ctx, ns,
    depth: depth + 1,
    term: t,
    onChange: (updater) => {
      if (hasOccurrence(len, i, term.body)) message.error(i18n.err.referred)
      else onChange(draft => {
        updater((draft as TPi).param[i])
      })
    },
  }))
  const fromElements = fromInfers.map(({ element }, i) => TermFrom({
    req,
    fromID: term.paramID[i],
    fromIX: i,
    from: element,
    len,
    to: term.body,
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
