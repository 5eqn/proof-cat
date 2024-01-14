import SelectBar from "../component/SelectBar";
import { i18n } from "../i18n";
import { TVar } from "../model/term";
import { TermHeader } from "./TermHeader";
import {TermPropsBase} from "../model/props";
import {onVarUpdate} from "../model/action/onVarUpdate";

export interface TermVarProps extends TermPropsBase<TVar> { }

export function TermVar(props: TermVarProps) {
  const { term, ns, depth, onChange } = props.req
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
      onChange={(ix) => onVarUpdate(ix, ns, onChange)}
    />
  </div>
}

