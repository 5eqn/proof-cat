import AnyBar from "../component/AnyBar";
import { TAny } from "../typecheck/model/term";
import { TermPropsBase } from "../typecheck/model/props";
import { InferRequest } from "../typecheck/model/infer";
import { mkAction } from "../typecheck/model/action";
import { onUpdate } from "../state";

export interface TermAnyProps extends TermPropsBase<TAny> { }

export function TermAny(props: TermAnyProps): JSX.Element {
  const { ns, depth, lens }: InferRequest<TAny> = props.req
  return <AnyBar
    depth={depth}
    ns={ns}
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
    onWrapFunc={(name: string) => onUpdate(mkAction({
      action: 'wrapFunc',
      name,
      envLen: ns.length,
    }, lens))}
    onWrapApp={() => onUpdate(mkAction({
      action: 'wrapApp',
      funcType: { val: 'any' },
      envLen: ns.length,
    }, lens))}
    onBecomeVar={(id: string, ix: number) => onUpdate(mkAction({
      action: 'becomeVar',
      id, ix,
    }, lens))}
    onBecomeU={() => onUpdate(mkAction({
      action: 'becomeU',
    }, lens))}
    onBecomeType={(name: string) => onUpdate(mkAction({
      action: 'becomeType',
      name,
    }, lens))}
    onBecomeNum={(num: string) => onUpdate(mkAction({
      action: 'becomeNum',
      num: +num,
    }, lens))}
  />
}
