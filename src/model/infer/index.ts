import { InferRequest, InferResult } from "./model";
import { Term } from "../term";
import { inferUni } from "./inferUni";
import { inferVar } from "./inferVar";
import { inferNum } from "./inferNum";
import { inferLet } from "./inferLet";
import { inferApp } from "./inferApp";
import { inferAny } from "./inferAny";
import { inferType } from "./inferType";
import { inferPi } from "./inferPi";
import { inferFunc } from "./inferFunc";

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
