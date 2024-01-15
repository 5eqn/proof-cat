import InputBar from "../component/InputBar";
import { i18n } from "../i18n";
import { TType } from "../model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../model/props";
import { InferRequest } from "../model/infer/model";

export interface TermTypeProps extends TermPropsBase<TType> { }

export function TermType(props: TermTypeProps): JSX.Element {
  const { term, depth, onChange }: InferRequest<TType> = props.req
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
      onChange={(value: string) => {
        onChange(draft => {
          draft.type = value
        })
      }}
    />
  </div>
}

