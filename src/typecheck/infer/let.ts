import { InferRequest, InferResult } from "../model/infer";
import { TLet } from "../model/term";
import { evaluate } from "../evaluate";
import { TermLet } from "../../view/TermLet";
import { infer } from "./index";
import { mapCallback } from "../model/callback";
import { Draft } from "immer";

export function inferLet(req: InferRequest<TLet>): InferResult {
  const { env, ctx, ns, depth, term, onChange } = req
  const onBodyChange = mapCallback(
    onChange,
    (draft: Draft<TLet>) => draft.body,
  )
  const onNextChange = mapCallback(
    onChange,
    (draft: Draft<TLet>) => draft.next
  )
  const { val: bodyVal, element: bodyElement } = infer({
    env: env,
    ctx: ctx,
    ns: ns,
    depth: depth + 1,
    term: term.body,
    onChange: onBodyChange,
  })
  const { val: nextVal, element: nextElement } = infer({
    env: [evaluate(env, term.body), ...env],
    ctx: [bodyVal, ...ctx],
    ns: [term.id, ...ns],
    depth,
    term: term.next,
    onChange: onNextChange,
  })
  return {
    val: nextVal,
    element: TermLet({
      req,
      type: nextVal,
      body: bodyElement,
      next: nextElement,
    }),
    debug: {
      onBodyChange,
      onNextChange,
    }
  }
}
