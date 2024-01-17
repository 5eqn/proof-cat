import SelectBar from "../component/SelectBar";
import { i18n } from "../i18n";
import { TVar } from "../typecheck/model/term";
import { TermHeader } from "./TermHeader";
import { TermPropsBase } from "../typecheck/model/props";
import { onVarUpdate } from "../typecheck/action/onVarUpdate";
import { InferRequest } from "../typecheck/model/infer";

export interface TermVarProps extends TermPropsBase<TVar> { }

export function TermVar(props: TermVarProps): JSX.Element {
  const { term, ns, depth, onChange }: InferRequest<TVar> = props.req
  return <div>
    <TermHeader
      req={props.req}
      type={props.type}
      label={i18n.term.var}
    />
    <SelectBar
      label={i18n.term.val}
      depth={depth}
      data={ns}
      index={term.ix}
      onChange={(ix) => onChange(onVarUpdate(ix, ns))}
    />
  </div>
}

