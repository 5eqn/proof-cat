import { InferRequest, InferResult } from "../model/infer";
import { TAny, TApp, Term, TFunc, TLet, TNum, TPi, TType, TUni, TVar } from "../model/term";
import { inferUni } from "./uni";
import { inferVar } from "./var";
import { inferNum } from "./num";
import { inferLet } from "./let";
import { inferApp } from "./app";
import { inferAny } from "./any";
import { inferType } from "./type";
import { inferPi } from "./pi";
import { inferFunc } from "./func";

export function infer<T extends Term>(req: InferRequest<T>): InferResult {
  const tm = req.tm
  switch (tm.term) {
    case 'uni':
      // Reason for casting: generics cannot be narrowed in Typescript
      // https://github.com/microsoft/TypeScript/issues/13995#issuecomment-439430612
      return inferUni(req as InferRequest<TUni>)
    case 'var':
      return inferVar(req as InferRequest<TVar>)
    case 'num':
      return inferNum(req as InferRequest<TNum>)
    case 'let':
      return inferLet(req as InferRequest<TLet>)
    case 'app':
      return inferApp(req as InferRequest<TApp>)
    case 'any':
      return inferAny(req as InferRequest<TAny>)
    case 'type':
      return inferType(req as InferRequest<TType>)
    case 'pi':
      return inferPi(req as InferRequest<TPi>)
    case 'func':
      return inferFunc(req as InferRequest<TFunc>)
  }
}
