import AnyBar from "../component/AnyBar";
import { TAny } from "../model/term";
import { onBecomeNum, onBecomeType, onBecomeU, onBecomeVar, onWrapFunc, onWrapLet, onWrapPi, TermPropsBase, validate } from "."

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

