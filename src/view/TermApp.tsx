import Labeled from "../component/Labeled";
import { i18n } from "../i18n";
import { TApp } from "../model/term";
import { TermHeader } from "./TermHeader";
import {TermPropsBase} from "../model/props";

export interface TermAppProps extends TermPropsBase<TApp> {
  args: JSX.Element[]
  func: JSX.Element
}

export function TermApp(props: TermAppProps) {
  const { depth } = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.apply}
    />
    {props.args}
    <Labeled
      depth={depth}
      label={i18n.term.target}
      children={props.func}
    />
  </div>
}

