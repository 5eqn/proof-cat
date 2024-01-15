/************
 EVALUATION
 ************/
import { Env } from "./env";
import { Term } from "./term";
import { Val } from "./value";
import { evaluateUni } from "./evaluate/evaluateUni";
import { evaluateLet } from "./evaluate/evaluateLet";
import { evaluateApp } from "./evaluate/evaluateApp";
import { evaluateFunc } from "./evaluate/evaluateFunc";
import { evaluatePi } from "./evaluate/evaluatePi";
import { evaluateVar } from "./evaluate/evaluateVar";
import { evaluateNum } from "./evaluate/evaluateNum";
import { evaluateType } from "./evaluate/evaluateType";
import { evaluateAny } from "./evaluate/evaluateAny";
import { quoteUni } from "./quote/quoteUni";
import { quoteApp } from "./quote/quoteApp";
import { quoteFunc } from "./quote/quoteFunc";
import { quotePi } from "./quote/quotePi";
import { quoteVar } from "./quote/quoteVar";
import { quoteNum } from "./quote/quoteNum";
import { quoteType } from "./quote/quoteType";
import { quoteAny } from "./quote/quoteAny";

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
