import Named from "../component/Named";
import { TApp } from "../typecheck/model/term";
import { InferRequest } from "../typecheck/model/infer";

export interface TermArgProps {
  // Infer request of the function it belongs to
  req: InferRequest<TApp>
  // Arg name of the applied function
  argID: string
  // The index of arg in local
  argIX: number
  // Rendered element of arg
  arg: JSX.Element
  // Context length after adding args
  len: number
}

export function TermArg(props: TermArgProps): JSX.Element {
  return <Named
    key={props.argID}
    name={props.argID}
    depth={props.req.depth + 1}
    children={props.arg}
  />
}
