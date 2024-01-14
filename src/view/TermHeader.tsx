import { InferRequest, onAnify, onWrapApp, onWrapFunc, onWrapLet, onWrapPi, validate } from "."
import Header from "../component/Header"
import { Term } from "../model/term"
import { Val } from "../model/value"

export interface TermHeaderProps {
  req: InferRequest<Term>
  type: Val,
  label: string,
}

export function TermHeader(props: TermHeaderProps): JSX.Element {
  const { env, ctx, ns, depth, onChange } = props.req
  return <Header
    depth={depth}
    label={props.label}
    validate={(name) => validate(name, ns)}
    onDelete={() => onAnify(onChange)}
    onWrapLet={(name) => onWrapLet(name, onChange)}
    onWrapPi={() => onWrapPi(onChange)}
    onWrapApp={() => onWrapApp(props.type, env, ctx, onChange)}
    onWrapFunc={() => onWrapFunc(onChange)}
  />
}
