import AnyBar from "../component/AnyBar";
import { TAny } from "../typecheck/model/term";
import { TermPropsBase } from "../typecheck/model/props";
import { onWrapFunc } from "../typecheck/action/onWrapFunc";
import { onWrapPi } from "../typecheck/action/onWrapPi";
import { onBecomeU } from "../typecheck/action/onBecomeU";
import { becomeVarIn } from "../typecheck/action/onBecomeVar";
import { validate } from "../typecheck/action/validate";
import { wrapLetOf } from "../typecheck/action/onWrapLet";
import { becomeTypeOf } from "../typecheck/action/onBecomeType";
import { becomeNumOf } from "../typecheck/action/onBecomeNum";
import { InferRequest } from "../typecheck/model/infer";

export interface TermAnyProps extends TermPropsBase<TAny> { }

export function TermAny(props: TermAnyProps): JSX.Element {
  const { ns, depth, onChange }: InferRequest<TAny> = props.req
  return <AnyBar
    depth={depth}
    validate={(name: string) => validate(name, ns)}
    onWrapLet={(name: string) => onChange(wrapLetOf(name))}
    onWrapPi={() => onChange(onWrapPi)}
    onWrapFunc={() => onChange(onWrapFunc)}
    onBecomeVar={() => onChange(becomeVarIn(ns))}
    onBecomeU={() => onChange(onBecomeU)}
    onBecomeType={(name: string) => onChange(becomeTypeOf(name))}
    onBecomeNum={(num: number) => onChange(becomeNumOf(num))}
  />
}

