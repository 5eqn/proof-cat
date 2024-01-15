import { Env } from "../model/env";
import { TLet } from "../model/term";
import { Val } from "../model/value";
import { evaluate } from "./index";

// Evaluate a term to a value
export function evaluateLet(env: Env, term: TLet): Val {
  const body = evaluate(env, term.body)
  return evaluate([body, ...env], term.next)
}
