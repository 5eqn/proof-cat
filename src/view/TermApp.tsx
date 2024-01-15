import Labeled from "../component/Labeled";
import { i18n } from "../i18n";
import { TApp } from "../typecheck/model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../typecheck/model/props";
import { InferRequest } from "../typecheck/model/infer";

export interface TermAppProps extends TermPropsBase<TApp> {
  args: JSX.Element[]
  func: JSX.Element
}

export function TermApp(props: TermAppProps): JSX.Element {
  const { depth }: InferRequest<TApp> = props.req
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

