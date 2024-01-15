import Labeled from "../component/Labeled";
import { i18n } from "../i18n";
import { TPi } from "../typecheck/model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../typecheck/model/props";
import { funcAddOf } from "../typecheck/action/onFuncAdd";
import { InferRequest } from "../typecheck/model/infer";

export interface TermPiProps extends TermPropsBase<TPi> {
  params: JSX.Element[]
  body: JSX.Element
}

export function TermPi(props: TermPiProps): JSX.Element {
  const { depth, onChange }: InferRequest<TPi> = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.pi}
      onAdd={(name: string) => onChange(funcAddOf(name))}
    />
    {props.params}
    <Labeled
      depth={depth}
      label={i18n.term.to}
      children={props.body}
    />
  </div>
}

