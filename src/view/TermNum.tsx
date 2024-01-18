import InputBar from "../component/InputBar";
import { i18n } from "../i18n";
import { TNum } from "../typecheck/model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../typecheck/model/props";
import { InferRequest } from "../typecheck/model/infer";
import { mkAction } from "../typecheck/model/action";

export interface TermNumProps extends TermPropsBase<TNum> { }

export function TermNum(props: TermNumProps): JSX.Element {
  const { term, depth, onChange }: InferRequest<TNum> = props.req
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
      onChange={(str: string) => onChange(mkAction({
        action: 'updateNum',
        oldNum: term.num,
        newNum: +str,
      }))}
    />
  </div>
}

