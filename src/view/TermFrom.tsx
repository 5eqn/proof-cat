import { InferRequest, onPiDelete } from ".";
import Named from "../component/Named";
import { Term, TPi } from "../model/term";

export interface TermFromProps {
  // Infer request of the function it belongs to
  req: InferRequest<TPi>
  // From name of the applied function
  fromID: string
  // The index of from in local
  fromIX: number
  // Rendered element of from
  from: JSX.Element
  // Context length after adding pi froms
  len: number
  // To term of pi
  to: Term
}

export function TermFrom(props: TermFromProps) {
  return <Named
    key={props.fromID}
    name={props.fromID}
    depth={props.req.depth + 1}
    children={props.from}
    onDelete={() => onPiDelete(
      props.fromIX,
      props.len,
      props.to,
      props.req.onChange,
    )}
  />
}

