import { Env } from "../model/env";
import { TPi } from "../model/term";
import { Val } from "../model/value";
import { evaluate } from "./index";

// Evaluate a term to a value
export function evaluatePi(env: Env, term: TPi): Val {
  return {
    val: 'pi',
    param: term.param.map((t) => evaluate(env, t)),
    paramID: term.paramID,
    func: {
      env,
      body: term.body,
    }
  }
}
