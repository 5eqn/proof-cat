import AnyBar from "../component/AnyBar";
import { TAny } from "../model/term";
import { TermPropsBase } from "../model/props";
import { onWrapFunc } from "../model/action/onWrapFunc";
import { onWrapPi } from "../model/action/onWrapPi";
import { onBecomeU } from "../model/action/onBecomeU";
import { becomeVarIn } from "../model/action/onBecomeVar";
import { validate } from "../model/action/validate";
import { wrapLetOf } from "../model/action/onWrapLet";
import { becomeTypeOf } from "../model/action/onBecomeType";
import { becomeNumOf } from "../model/action/onBecomeNum";
import { InferRequest } from "../model/infer/model";

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

