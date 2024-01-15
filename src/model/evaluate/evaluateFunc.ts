import { Env } from "../env";
import { TFunc } from "../term";
import { Val } from "../value";
import { evaluate } from "../evaluate";

// Evaluate a term to a value
export function evaluateFunc(env: Env, term: TFunc): Val {
  return {
    val: 'func',
    param: term.param.map((t) => evaluate(env, t)),
    paramID: term.paramID,
    func: {
      env,
      body: term.body,
    }
  }
}
