import Header from "../component/Header"
import { Term } from "../model/term"
import { Val } from "../model/value"
import { InferRequest } from "../model/infer/model";
import { onAnify } from "../model/action/onAnify";
import { onWrapLet } from "../model/action/onWrapLet";
import { onWrapFunc } from "../model/action/onWrapFunc";
import { onWrapPi } from "../model/action/onWrapPi";
import { onWrapApp } from "../model/action/onWrapApp";
import { validate } from "../model/action/validate";

export interface TermHeaderProps {
  req: InferRequest<Term>
  type: Val,
  label: string,
  onAdd?: (name: string) => void
}

export function TermHeader(props: TermHeaderProps): JSX.Element {
  const { ctx, ns, depth, onChange } = props.req
  return <Header
    depth={depth}
    label={props.label}
    validate={(name) => validate(name, ns)}
    onDelete={() => onAnify(onChange)}
    onWrapLet={(name) => onWrapLet(name, onChange)}
    onWrapPi={() => onWrapPi(onChange)}
    onWrapApp={() => onChange((draft: any) => onWrapApp(props.type, ctx, draft))}
    onWrapFunc={() => onWrapFunc(onChange)}
    onAdd={props.onAdd}
  />
}
