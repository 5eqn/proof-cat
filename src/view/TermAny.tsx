import AnyBar from "../component/AnyBar";
import { TAny } from "../typecheck/model/term";
import { TermPropsBase } from "../typecheck/model/props";
import { onWrapFunc } from "../typecheck/action/onWrapFunc";
import { onWrapPi } from "../typecheck/action/onWrapPi";
import { onBecomeU } from "../typecheck/action/onBecomeU";
import { onBecomeVar } from "../typecheck/action/onBecomeVar";
import { validate } from "../typecheck/action/validate";
import { onWrapLet } from "../typecheck/action/onWrapLet";
import { onBecomeType } from "../typecheck/action/onBecomeType";
import { onBecomeNum } from "../typecheck/action/onBecomeNum";
import { InferRequest } from "../typecheck/model/infer";

export interface TermAnyProps extends TermPropsBase<TAny> { }

export function TermAny(props: TermAnyProps): JSX.Element {
  const { ns, depth, onChange }: InferRequest<TAny> = props.req
  return <AnyBar
    depth={depth}
    validate={(name: string) => validate(name, ns)}
    onWrapLet={(name: string) => onChange(onWrapLet(name))}
    onWrapPi={() => onChange(onWrapPi)}
    onWrapFunc={() => onChange(onWrapFunc)}
    onBecomeVar={() => onChange(onBecomeVar(ns))}
    onBecomeU={() => onChange(onBecomeU)}
    onBecomeType={(name: string) => onChange(onBecomeType(name))}
    onBecomeNum={(num: number) => onChange(onBecomeNum(num))}
  />
}

