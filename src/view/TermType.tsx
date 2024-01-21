import InputBar from "../component/InputBar";
import { i18n } from "../i18n";
import { TType } from "../typecheck/model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../typecheck/model/props";
import { InferRequest } from "../typecheck/model/infer";
import { mkAction } from "../typecheck/model/action";
import { onUpdate } from "../state";

export interface TermTypeProps extends TermPropsBase<TType> { }

export function TermType(props: TermTypeProps): JSX.Element {
  const { term, depth, lens }: InferRequest<TType> = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.type}
    />
    <InputBar
      label={i18n.term.val}
      depth={depth}
      value={term.type}
      onChange={(value: string) => onUpdate(mkAction({
        action: 'updateType',
        oldType: term.type,
        newType: value,
      }, lens))}
    />
  </div>
}

