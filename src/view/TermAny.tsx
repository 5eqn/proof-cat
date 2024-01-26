import { TAny } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Droppable } from "../component/Droppable";
import { applyLens, joinLens } from "../typecheck/model/rec";
import { Block } from "../component/Block";
import { useSnapshot } from "valtio";
import { state } from "../state";
import { prettyStep } from "../typecheck/pretty";
import { quote } from "../typecheck/quote";

export function TermAny({ lens, parent }: TermProps<TAny>): JSX.Element {
  const inferRes = useSnapshot(applyLens(state.inferResult, lens)) as any
  const ns = inferRes.ns
  const ty = inferRes.expected
  return <Droppable id={joinLens(lens)}>
    <Block
      inset
      shape={ty ? prettyStep(ns, quote(ns.length, ty)) : undefined}
      parent={parent}
    />
  </Droppable>
}
