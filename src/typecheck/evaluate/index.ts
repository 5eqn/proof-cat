import { Env } from "../model/env";
import { Term } from "../model/term";
import { Val } from "../model/value";
import { evaluateUni } from "./uni";
import { evaluateLet } from "./let";
import { evaluateApp } from "./app";
import { evaluateFunc } from "./func";
import { evaluatePi } from "./pi";
import { evaluateVar } from "./var";
import { evaluateNum } from "./num";
import { evaluateType } from "./type";
import { evaluateAny } from "./any";
import { quoteUni } from "../quote/uni";
import { quoteApp } from "../quote/app";
import { quoteFunc } from "../quote/func";
import { quotePi } from "../quote/pi";
import { quoteVar } from "../quote/var";
import { quoteNum } from "../quote/num";
import { quoteType } from "../quote/type";
import { quoteAny } from "../quote/any";

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

// Quote a value to a term
export function quote(len: number, val: Val): Term {
  switch (val.val) {
    case 'uni':
      return quoteUni()
    case 'app':
      return quoteApp(len, val)
    case 'func':
      return quoteFunc(len, val)
    case 'pi':
      return quotePi(len, val)
    case 'var':
      return quoteVar(len, val)
    case 'num':
      return quoteNum(val)
    case 'type':
      return quoteType(val)
    case 'any':
      return quoteAny()
  }
}

// Curried evaluation
export const evalIn = (env: Env) => (term: Term) => evaluate(env, term)

// Make spine
export const makeSpineIn = (len: number) => (id: string, ix: number) => ({
  val: 'var',
  id,
  lvl: len - ix - 1,
} as Val)
