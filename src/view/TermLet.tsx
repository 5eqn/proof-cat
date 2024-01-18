import Named from "../component/Named";
import { TLet } from "../typecheck/model/term";
import { TermPropsBase } from "../typecheck/model/props";
import { InferRequest } from "../typecheck/model/infer";
import { mkAction } from "../typecheck/model/action";

export interface TermLetProps extends TermPropsBase<TLet> {
  body: JSX.Element
  next: JSX.Element
}

export function TermLet(props: TermLetProps): JSX.Element {
  const { env, term, depth, onChange }: InferRequest<TLet> = props.req
  return <div>
    <Named
      depth={depth}
      name={term.id}
      onDelete={() => onChange(mkAction({
        action: 'remove',
        backup: { ...term },
        envLen: env.length,
      }))}
    >
      {props.body}
    </Named>
    {props.next}
  </div>
}

