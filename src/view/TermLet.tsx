import { onLetDelete, TermPropsBase } from ".";
import Named from "../component/Named";
import { TLet } from "../model/term";

export interface TermLetProps extends TermPropsBase<TLet> {
  body: JSX.Element
  next: JSX.Element
}

export function TermLet(props: TermLetProps) {
  const { env, term, depth, onChange } = props.req
  return <div>
    <Named
      depth={depth}
      name={term.id}
      onDelete={() => onLetDelete(env, term.next, onChange)}
    >
      {props.body}
    </Named>
    {props.next}
  </div>
}

