import InputBar from "../component/InputBar";
import { i18n } from "../i18n";
import { TNum } from "../model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../model/props";
import { numUpdateTo } from "../model/action/onNumUpdate";

export interface TermNumProps extends TermPropsBase<TNum> { }

export function TermNum(props: TermNumProps) {
  const { term, depth, onChange } = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.num}
    />
    <InputBar
      depth={depth}
      label={i18n.term.val}
      value={term.num.toString()}
      onChange={(str) => onChange(numUpdateTo(+str))}
    />
  </div>
}

