import Named from "../component/Named";
import SelectBar from "../component/SelectBar";
import { i18n } from "../i18n";
import { TApp } from "../model/term";
import { unify } from "../model/unify";
import {TermPropsBase} from "../model/props";

export interface TermArgProps extends TermPropsBase<TApp> {
  // Param name of the applied function
  paramID: string
  // The argument index in context
  globalIX: number
  // The argument index in local
  argIX: number
}

export function TermArg(props: TermArgProps) {
  // Filter variable of correct type
  const { ctx, ns, depth, onChange } = props.req
  const selection = ns
    .map<[string, number]>((n, globalIX) => [n, globalIX])
    .filter(([_, globalIX]) =>
      unify(ns.length, ctx[globalIX], props.type) === null)
  // Invert selection
  let invSel = new Array(ns.length)
  selection.forEach(([_, globalIX], localIX) => {
    invSel[globalIX] = localIX
  })
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
      onChange={(localIX) => {
        onChange(draft => {
          // Incrementally update argument index and name
          draft.argIX[props.argIX] = selection[localIX][1]
          draft.argID[props.argIX] = selection[localIX][0]
        })
      }}
    />
  </Named>
}

