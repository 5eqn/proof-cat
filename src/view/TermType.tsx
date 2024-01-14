import { TermPropsBase } from ".";
import InputBar from "../component/InputBar";
import { i18n } from "../i18n";
import { TType } from "../model/term";
import { TermHeader } from "./TermHeader";

export interface TermTypeProps extends TermPropsBase<TType> { }

export function TermType(props: TermTypeProps) {
  const { term, depth, onChange } = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.var}
    />
    <InputBar
      label={i18n.term.val}
      depth={depth}
      value={term.type}
      onChange={(value) => {
        onChange(draft => {
          draft.type = value
        })
      }}
    />
  </div>
}
