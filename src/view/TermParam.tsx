import Named from "../component/Named";
import { Term, TFunc } from "../model/term";
import {InferRequest} from "../model/infer/model";
import {onFuncDelete} from "../model/action/onFuncDelete";

export interface TermParamProps {
  // Infer request of the function it belongs to
  req: InferRequest<TFunc>
  // Param name of the applied function
  paramID: string
  // The index of param in local
  paramIX: number
  // Rendered element of param
  param: JSX.Element
  // Context length after adding params
  len: number
  // Body of function
  body: Term
}

export function TermParam(props: TermParamProps) {
  return <Named
    key={props.paramID}
    name={props.paramID}
    depth={props.req.depth + 1}
    children={props.param}
    onDelete={() => onFuncDelete(
      props.paramIX,
      props.len,
      props.body,
      props.req.onChange
    )}
  />
}

