import { Env } from "../env";
import { TLet } from "../term";
import { Val } from "../value";
import { evaluate } from "../evaluate";

// Evaluate a term to a value
export function evaluateLet(env: Env, term: TLet): Val {
  const body = evaluate(env, term.body)
  return evaluate([body, ...env], term.next)
}
