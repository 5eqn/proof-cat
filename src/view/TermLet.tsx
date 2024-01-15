import Named from "../component/Named";
import { TLet } from "../model/term";
import { TermPropsBase } from "../model/props";
import { letDeleteIn } from "../model/action/onLetDelete";

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
      onDelete={() => onChange(letDeleteIn(env, term.next))}
    >
      {props.body}
    </Named>
    {props.next}
  </div>
}

