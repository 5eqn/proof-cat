import { InferRequest, InferResult } from "../model/infer";
import { Term, TLet } from "../model/term";
import { evaluate } from "../evaluate";
import { TermLet } from "../../view/TermLet";
import { infer } from "./index";

export function inferLet(req: InferRequest<TLet>): InferResult {
  const { env, ctx, ns, depth, term, lens } = req
  const getBody = (t: Term) => lens(t).body
  const getNext = (t: Term) => lens(t).next
  const { val: bodyVal, element: bodyElement } = infer({
    env: env,
    ctx: ctx,
    ns: ns,
    depth: depth + 1,
    term: term.body,
    lens: getBody,
  })
  const { val: nextVal, element: nextElement } = infer({
    env: [evaluate(env, term.body), ...env],
    ctx: [bodyVal, ...ctx],
    ns: [term.id, ...ns],
    depth,
    term: term.next,
    lens: getNext,
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
      getBody,
      getNext,
    }
  }
}
