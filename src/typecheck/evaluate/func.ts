import { Env } from "../model/env";
import { TFunc } from "../model/term";
import { Val } from "../model/value";
import { evaluate } from "./index";

// Evaluate a term to a value
export function evaluateFunc(env: Env, term: TFunc): Val {
  return {
    val: 'func',
    param: evaluate(env, term.param),
    paramID: term.paramID,
    func: {
      env,
      body: term.body,
    }
  }
}
