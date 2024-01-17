import Named from "../component/Named";
import { Term, TFunc, TPi } from "../typecheck/model/term";
import { InferRequest } from "../typecheck/model/infer";
import { onFuncDelete } from "../typecheck/action/onFuncDelete";
import { i18n } from "../i18n";

export interface TermParamProps {
  // Infer request of the function it belongs to
  req: InferRequest<TFunc | TPi>
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

export function TermParam(props: TermParamProps): JSX.Element {
  return <Named
    key={props.paramID}
    name={props.paramID + ' ' + i18n.term.hasType}
    depth={props.req.depth + 1}
    children={props.param}
    onDelete={() => props.req.onChange(
      onFuncDelete(
        props.paramIX,
        props.len,
        props.body,
      ))}
  />
}

