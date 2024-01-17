import Header from "../component/Header"
import { Term } from "../typecheck/model/term"
import { Val } from "../typecheck/model/value"
import { InferRequest } from "../typecheck/model/infer";
import { onAnify } from "../typecheck/action/onAnify";
import { onWrapFunc } from "../typecheck/action/onWrapFunc";
import { onWrapPi } from "../typecheck/action/onWrapPi";
import { onWrapApp } from "../typecheck/action/onWrapApp";
import { validate } from "../typecheck/action/validate";
import { onWrapLet } from "../typecheck/action/onWrapLet";

export interface TermHeaderProps {
  req: InferRequest<Term>
  type: Val,
  label: string,
  onAdd?: (name: string) => void
}

export function TermHeader(props: TermHeaderProps): JSX.Element {
  const { ctx, ns, depth, onChange }: InferRequest<Term> = props.req
  return <Header
    depth={depth}
    label={props.label}
    validate={(name: string) => validate(name, ns)}
    onDelete={() => onChange(onAnify)}
    onWrapLet={(name: string) => onChange(onWrapLet(name))}
    onWrapPi={(name: string) => onChange(onWrapPi(name))}
    onWrapApp={() => onChange(onWrapApp(props.type, ctx))}
    onWrapFunc={(name) => onChange(onWrapFunc(name))}
    onAdd={props.onAdd}
  />
}
