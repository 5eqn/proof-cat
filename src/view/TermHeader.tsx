import Header from "../component/Header"
import { Term } from "../model/term"
import { Val } from "../model/value"
import { InferRequest } from "../model/infer/model";
import { onAnify } from "../model/action/onAnify";
import { onWrapFunc } from "../model/action/onWrapFunc";
import { onWrapPi } from "../model/action/onWrapPi";
import { wrapAppIn } from "../model/action/onWrapApp";
import { validate } from "../model/action/validate";
import { wrapLetOf } from "../model/action/onWrapLet";

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
    onWrapLet={(name: string) => onChange(wrapLetOf(name))}
    onWrapPi={() => onChange(onWrapPi)}
    onWrapApp={() => onChange(wrapAppIn(props.type, ctx))}
    onWrapFunc={() => onChange(onWrapFunc)}
    onAdd={props.onAdd}
  />
}
