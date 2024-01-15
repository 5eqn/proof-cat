import { InferRequest } from "./model";
import { TApp } from "../term";
import { VPi } from "../value";
import { TermArg } from "../../view/TermArg";

export function inferArg(req: InferRequest<TApp>, funcType: VPi): JSX.Element[] {
  return req.term.argIX.map((globalIX, argIX) => TermArg({
    req, globalIX, argIX,
    type: funcType.param[argIX],
    paramID: funcType.paramID[argIX],
  }))
}
