import { InferRequest, InferResult } from "../model/infer";
import { Term } from "../model/term";
import { inferUni } from "./uni";
import { inferVar } from "./var";
import { inferNum } from "./num";
import { inferLet } from "./let";
import { inferApp } from "./app";
import { inferAny } from "./any";
import { inferType } from "./type";
import { inferPi } from "./pi";
import { inferFunc } from "./func";

export function infer(req: InferRequest<Term>): InferResult {
  switch (req.term.term) {
    case 'uni':
      return inferUni(req as any)
    case 'var':
      return inferVar(req as any)
    case 'num':
      return inferNum(req as any)
    case 'let':
      return inferLet(req as any)
    case 'app':
      return inferApp(req as any)
    case 'any':
      return inferAny(req as any)
    case 'type':
      return inferType(req as any)
    case 'pi':
      return inferPi(req as any)
    case 'func':
      return inferFunc(req as any)
  }
}
