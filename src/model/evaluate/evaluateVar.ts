import { Env } from "../env";
import { TVar } from "../term";
import { Val } from "../value";

// Evaluate a term to a value
export function evaluateVar(env: Env, term: TVar): Val {
  return env[term.ix]
}
