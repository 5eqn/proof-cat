import Labeled from "../component/Labeled";
import { i18n } from "../i18n";
import { TFunc } from "../typecheck/model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../typecheck/model/props";
import { InferRequest } from "../typecheck/model/infer";
import { mkAction } from "../typecheck/model/action";
import { onUpdate } from "../state";

export interface TermFuncProps extends TermPropsBase<TFunc> {
  params: JSX.Element[]
  body: JSX.Element
}

export function TermFunc(props: TermFuncProps): JSX.Element {
  const { ns, depth, lens }: InferRequest<TFunc> = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.func}
      onAdd={(name: string) => onUpdate(mkAction({
        action: 'addParam',
        envLen: ns.length,
        id: name,
        ix: 0,
      }, lens))}
    />
    {props.params}
    <Labeled
      depth={depth}
      label={i18n.term.body}
      children={props.body}
    />
  </div>
}

