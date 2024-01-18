import { InferRequest, InferResult, getElements, getDebugs } from "../model/infer";
import { TApp, Term } from "../model/term";
import { evaluate } from "../evaluate";
import { Val, VPi } from "../model/value";
import { apply } from "../model/closure";
import { TermApp } from "../../view/TermApp";

import { infer } from "./index";
import { ErrorChangeApply } from "../model/error";
import { inferArg } from "./arg";

export function inferApp(req: InferRequest<TApp>): InferResult {
  // Get function type
  const { env, ctx, ns, depth, term }: InferRequest<TApp> = req
  const onFuncChange = () => {
    throw new ErrorChangeApply()
  }
  const { val: funcVal, element: funcElement }: InferResult = infer({
    env, ctx, ns,
    depth: depth + 1,
    term: term.func,
    onChange: onFuncChange
  })
  const funcType: VPi = funcVal as VPi
  // Make sure function's type is Pi
  // if (funcType.val !== 'pi') {
  //   throw new ErrorCallNonFunc(funcType)
  // }
  // Make sure application length match
  // if (term.arg.length !== funcType.param.length) {
  //   throw new 
  // }
  // Infer argument types
  const argInfers = inferArg(req)
  // Make sure application namespace match
  // Make sure argument's type match
  // Apply arguments to function type to get applied type
  const argVals: Val[] = term.arg.map((v: Term) => evaluate(env, v))
  const val: Val = apply(funcType.func, argVals)
  return {
    val: val,
    element: TermApp({
      req,
      type: val,
      args: getElements(argInfers),
      func: funcElement,
    }),
    debug: {
      onFuncChange,
      onArgChange: getDebugs(argInfers),
    }
  }
}
