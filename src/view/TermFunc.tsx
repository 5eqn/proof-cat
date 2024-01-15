import Labeled from "../component/Labeled";
import { i18n } from "../i18n";
import { TFunc } from "../model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../model/props";
import { funcAddOf } from "../model/action/onFuncAdd";

export interface TermFuncProps extends TermPropsBase<TFunc> {
  params: JSX.Element[]
  body: JSX.Element
}

export function TermFunc(props: TermFuncProps) {
  const { depth, onChange } = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.func}
      onAdd={(name) => onChange(funcAddOf(name))}
    />
    {props.params}
    <Labeled
      depth={depth}
      label={i18n.term.body}
      children={props.body}
    />
  </div>
}

