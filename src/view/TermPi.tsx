import Labeled from "../component/Labeled";
import { i18n } from "../i18n";
import { TPi } from "../model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../model/props";
import { onPiAdd } from "../model/action/onPiAdd";

export interface TermPiProps extends TermPropsBase<TPi> {
  froms: JSX.Element[]
  to: JSX.Element
}

export function TermPi(props: TermPiProps) {
  const { depth, onChange } = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.pi}
      onAdd={(name) => onPiAdd(name, onChange)}
    />
    {props.froms}
    <Labeled
      depth={depth}
      label={i18n.term.to}
      children={props.to}
    />
  </div>
}

