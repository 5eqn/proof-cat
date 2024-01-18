import Named from "../component/Named";
import SelectBar from "../component/SelectBar";
import { i18n } from "../i18n";
import { TApp } from "../typecheck/model/term";
import { unify } from "../typecheck/unify";
import { TermPropsBase } from "../typecheck/model/props";
import { index, invert } from "../util";
import { onArgUpdate } from "../typecheck/action/onArgUpdate";
import { InferRequest } from "../typecheck/model/infer";

export interface TermArgProps extends TermPropsBase<TApp> {
  // Param name of the applied function
  paramID: string
  // The argument index in context
  globalIX: number
  // The argument index in local
  arg: number
}

export function TermArg(props: TermArgProps): JSX.Element {
  // Filter variable of correct type
  const { ctx, ns, depth, onChange }: InferRequest<TApp> = props.req
  const selection: [string, number][] = index(ns).filter(([_, globalIX]) =>
    unify(ns.length, ctx[globalIX], props.type) === null)
  // Invert selection
  const invSel: number[] = invert(selection)
  // Construct elements
  return <Named
    key={props.paramID}
    depth={depth + 1}
    name={props.paramID}
  >
    <SelectBar
      depth={depth + 1}
      label={i18n.term.val}
      data={selection.map(([n, _]) => n)}
      index={invSel[props.globalIX]}
      onChange={(localIX: number) => onChange(onArgUpdate(
        selection[localIX],
        props.arg,
      ))}
    />
  </Named>
}