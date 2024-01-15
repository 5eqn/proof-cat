import { Env } from "../model/env";
import { TVar } from "../model/term";
import { Val } from "../model/value";

// Evaluate a term to a value
export function evaluateVar(env: Env, term: TVar): Val {
  return env[term.ix]
}
