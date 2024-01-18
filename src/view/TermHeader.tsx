import Header from "../component/Header"
import { Term } from "../typecheck/model/term"
import { Val } from "../typecheck/model/value"
import { InferRequest } from "../typecheck/model/infer";
import { mkAction } from "../typecheck/model/action";

export interface TermHeaderProps {
  req: InferRequest<Term>
  type: Val,
  label: string,
  onAdd?: (name: string) => boolean
}

export function TermHeader(props: TermHeaderProps): JSX.Element {
  const { ns, term, depth, onChange }: InferRequest<Term> = props.req
  return <Header
    depth={depth}
    label={props.label}
    onDelete={() => onChange(mkAction({
      action: 'remove',
      backup: { ...term },
      envLen: ns.length,
    }))}
    onWrapLet={(name: string) => onChange(mkAction({
      action: 'wrapLet',
      name,
    }))}
    onWrapPi={(name: string) => onChange(mkAction({
      action: 'wrapPi',
      name,
    }))}
    onWrapFunc={(name) => onChange(mkAction({
      action: 'wrapFunc',
      name,
    }))}
    onWrapApp={() => onChange(mkAction({
      action: 'wrapApp',
      funcType: props.type,
    }))}
    onAdd={props.onAdd}
  />
}
