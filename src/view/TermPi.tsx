import Labeled from "../component/Labeled";
import { i18n } from "../i18n";
import { TPi } from "../model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../model/props";
import { funcAddOf } from "../model/action/onFuncAdd";

export interface TermPiProps extends TermPropsBase<TPi> {
  params: JSX.Element[]
  body: JSX.Element
}

export function TermPi(props: TermPiProps) {
  const { depth, onChange } = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.pi}
      onAdd={(name) => onChange(funcAddOf(name))}
    />
    {props.params}
    <Labeled
      depth={depth}
      label={i18n.term.to}
      children={props.body}
    />
  </div>
}

