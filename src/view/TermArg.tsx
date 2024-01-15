import Named from "../component/Named";
import SelectBar from "../component/SelectBar";
import { i18n } from "../i18n";
import { TApp } from "../model/term";
import { unify } from "../model/unify";
import { TermPropsBase } from "../model/props";
import { index, invert } from "../util";
import { argUpdateTo } from "../model/action/onArgUpdate";
import { InferRequest } from "../model/infer/model";

export interface TermArgProps extends TermPropsBase<TApp> {
  // Param name of the applied function
  paramID: string
  // The argument index in context
  globalIX: number
  // The argument index in local
  argIX: number
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
      onChange={(localIX: number) => onChange(argUpdateTo(
        selection[localIX],
        props.argIX,
      ))}
    />
  </Named>
}
