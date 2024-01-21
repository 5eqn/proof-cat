import Named from "../component/Named";
import { TFunc, TPi } from "../typecheck/model/term";
import { InferRequest } from "../typecheck/model/infer";
import { i18n } from "../i18n";
import { mkAction } from "../typecheck/model/action";
import { onUpdate } from "../state";

export interface TermParamProps {
  // Infer request of the function it belongs to
  req: InferRequest<TFunc | TPi>
  // Param name of the applied function
  paramID: string
  // The index of param in local
  paramIX: number
  // Rendered element of param
  param: JSX.Element
}

export function TermParam(props: TermParamProps): JSX.Element {
  return <Named
    key={props.paramID}
    name={props.paramID + ' ' + i18n.term.hasType}
    depth={props.req.depth + 1}
    children={props.param}
    onDelete={() => onUpdate(mkAction({
      // TODO this will create `any` on revert
      action: 'addParam',
      id: props.paramID,
      ix: props.paramIX,
      envLen: props.req.ns.length,
    }, props.req.lens, true))}
  />
}
