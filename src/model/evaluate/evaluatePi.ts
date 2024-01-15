import { Env } from "../env";
import { TPi } from "../term";
import { Val } from "../value";
import { evaluate } from "../evaluate";

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
