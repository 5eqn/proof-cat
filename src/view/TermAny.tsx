import AnyBar from "../component/AnyBar";
import { TAny } from "../model/term";
import {TermPropsBase} from "../model/props";
import {onWrapLet} from "../model/action/onWrapLet";
import {onWrapFunc} from "../model/action/onWrapFunc";
import {onWrapPi} from "../model/action/onWrapPi";
import {onBecomeU} from "../model/action/onBecomeU";
import {onBecomeType} from "../model/action/onBecomeType";
import {onBecomeNum} from "../model/action/onBecomeNum";
import {onBecomeVar} from "../model/action/onBecomeVar";
import {validate} from "../model/action/validate";

export interface TermAnyProps extends TermPropsBase<TAny> { }

export function TermAny(props: TermAnyProps) {
  const { ns, depth, onChange } = props.req
  return <AnyBar
    depth={depth}
    validate={(name) => validate(name, ns)}
    onWrapLet={(name) => onWrapLet(name, onChange)}
    onWrapPi={() => onWrapPi(onChange)}
    onWrapFunc={() => onWrapFunc(onChange)}
    onBecomeVar={() => onBecomeVar(ns, onChange)}
    onBecomeU={() => onBecomeU(onChange)}
    onBecomeType={(name) => onBecomeType(name, onChange)}
    onBecomeNum={(num) => onBecomeNum(num, onChange)}
  />
}

