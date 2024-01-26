import { infer } from "../infer";
import { CheckRequest, InferResult } from "../model/infer";
import { Term } from "../model/term";
import { unify } from "../unify";

export function check(req: CheckRequest<Term>): InferResult {
  const inferRes: InferResult = infer(req)
  unify(req.env.length, inferRes.type, req.expected)
  return {
    ...inferRes,
    type: inferRes.type,
    expected: req.expected,
  }
}
