import Labeled from "../component/Labeled";
import { i18n } from "../i18n";
import { TFunc } from "../typecheck/model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../typecheck/model/props";
import { onFuncAdd } from "../typecheck/action/onFuncAdd";
import { InferRequest } from "../typecheck/model/infer";

export interface TermFuncProps extends TermPropsBase<TFunc> {
  params: JSX.Element[]
  body: JSX.Element
}

export function TermFunc(props: TermFuncProps): JSX.Element {
  const { depth, onChange }: InferRequest<TFunc> = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.func}
      onAdd={(name: string) => onChange(onFuncAdd(name))}
    />
    {props.params}
    <Labeled
      depth={depth}
      label={i18n.term.body}
      children={props.body}
    />
  </div>
}

