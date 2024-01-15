import {Env} from "../model/env";
import {Term} from "../model/term";
import {Val} from "../model/value";
import {evaluateUni} from "./uni";
import {evaluateLet} from "./let";
import {evaluateApp} from "./app";
import {evaluateFunc} from "./func";
import {evaluatePi} from "./pi";
import {evaluateVar} from "./var";
import {evaluateNum} from "./num";
import {evaluateType} from "./type";
import {evaluateAny} from "./any";

// Evaluate a term to a value
export function evaluate(env: Env, term: Term): Val {
  switch (term.term) {
    case 'uni':
      return evaluateUni()
    case 'let':
      return evaluateLet(env, term)
    case 'app':
      return evaluateApp(env, term)
    case 'func':
      return evaluateFunc(env, term)
    case 'pi':
      return evaluatePi(env, term)
    case 'var':
      return evaluateVar(env, term)
    case 'num':
      return evaluateNum(term)
    case 'type':
      return evaluateType(term)
    case 'any':
      return evaluateAny()
  }
}

// Curried evaluation
export const evalIn = (env: Env) => (term: Term) => evaluate(env, term)

