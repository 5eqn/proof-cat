import AnyBar from "../component/AnyBar";
import { TAny } from "../typecheck/model/term";
import { TermPropsBase } from "../typecheck/model/props";
import { InferRequest } from "../typecheck/model/infer";
import { mkAction } from "../typecheck/model/action";

export interface TermAnyProps extends TermPropsBase<TAny> { }

export function TermAny(props: TermAnyProps): JSX.Element {
  const { ns, depth, onChange }: InferRequest<TAny> = props.req
  return <AnyBar
    depth={depth}
    ns={ns}
    onWrapLet={(name: string) => onChange(mkAction({
      action: 'wrapLet',
      name,
    }))}
    onWrapPi={(name: string) => onChange(mkAction({
      action: 'wrapPi',
      name,
    }))}
    onWrapFunc={(name: string) => onChange(mkAction({
      action: 'wrapFunc',
      name,
    }))}
    onBecomeVar={(id: string, ix: number) => onChange(mkAction({
      action: 'becomeVar',
      id, ix,
    }))}
    onBecomeU={() => onChange(mkAction({
      action: 'becomeU',
    }))}
    onBecomeType={(name: string) => onChange(mkAction({
      action: 'becomeType',
      name,
    }))}
    onBecomeNum={(num: string) => onChange(mkAction({
      action: 'becomeNum',
      num: +num,
    }))}
  />
}
