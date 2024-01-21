import Labeled from "../component/Labeled";
import { i18n } from "../i18n";
import { TPi } from "../typecheck/model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../typecheck/model/props";
import { InferRequest } from "../typecheck/model/infer";
import { mkAction } from "../typecheck/model/action";
import { onUpdate } from "../state";

export interface TermPiProps extends TermPropsBase<TPi> {
  params: JSX.Element[]
  body: JSX.Element
}

export function TermPi(props: TermPiProps): JSX.Element {
  const { ns, depth, lens }: InferRequest<TPi> = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.pi}
      onAdd={(name: string) => onUpdate(mkAction({
        action: 'addParam',
        id: name,
        ix: 0,
        envLen: ns.length,
      }, lens))}
    />
    {props.params}
    <Labeled
      depth={depth}
      label={i18n.term.to}
      children={props.body}
    />
  </div>
}

