import Header from "../component/Header"
import { Term } from "../typecheck/model/term"
import { Val } from "../typecheck/model/value"
import { InferRequest } from "../typecheck/model/infer";
import { mkAction } from "../typecheck/model/action";
import { onUpdate } from "../typecheck/update";

export interface TermHeaderProps<T extends Term> {
  req: InferRequest<T>
  type: Val,
  label: string,
  onAdd?: (name: string) => boolean
}

export function TermHeader<T extends Term>(props: TermHeaderProps<T>): JSX.Element {
  const { ns, term, depth, lens }: InferRequest<T> = props.req
  return <Header
    depth={depth}
    label={props.label}
    onDelete={() => onUpdate(mkAction({
      action: 'remove',
      backup: { ...term },
      envLen: ns.length,
    }, lens))}
    onWrapLet={(name: string) => onUpdate(mkAction({
      action: 'wrapLet',
      name,
      envLen: ns.length,
    }, lens))}
    onWrapPi={(name: string) => onUpdate(mkAction({
      action: 'wrapPi',
      name,
      envLen: ns.length,
    }, lens))}
    onWrapFunc={(name) => onUpdate(mkAction({
      action: 'wrapFunc',
      name,
      envLen: ns.length,
    }, lens))}
    onWrapApp={() => onUpdate(mkAction({
      action: 'wrapApp',
      funcType: props.type,
      envLen: ns.length,
    }, lens))}
    onAdd={props.onAdd}
  />
}
