import { TAny } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Droppable } from "../component/Droppable";
import { joinLens } from "../typecheck/model/rec";
import { Block } from "../component/Block";

export function TermAny(props: TermProps<TAny>): JSX.Element {
  return <Droppable id={joinLens(props.lens)}>
    <Block inset />
  </Droppable>
}
