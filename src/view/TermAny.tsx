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

export interface TermAnyProps extends TermPropsBase<TAny> { }

export function TermAny(props: TermAnyProps) {
  const { ns, depth, onChange } = props.req
  return <AnyBar
    depth={depth}
    validate={(name) => validate(name, ns)}
    onWrapLet={(name) => onChange(wrapLetOf(name))}
    onWrapPi={() => onChange(onWrapPi)}
    onWrapFunc={() => onChange(onWrapFunc)}
    onBecomeVar={() => onChange(becomeVarIn(ns))}
    onBecomeU={() => onChange(onBecomeU)}
    onBecomeType={(name) => onChange(becomeTypeOf(name))}
    onBecomeNum={(num) => onChange(becomeNumOf(num))}
  />
}

