import { InferRequest } from "../model/infer";
import { TApp } from "../model/term";
import { VPi } from "../model/value";
import { TermArg } from "../../view/TermArg";

export function inferArg(req: InferRequest<TApp>, funcType: VPi): JSX.Element[] {
  return req.term.arg.map((globalIX, arg) => TermArg({
    req, globalIX, arg,
    type: funcType.param[arg],
    paramID: funcType.paramID[arg],
  }))
}