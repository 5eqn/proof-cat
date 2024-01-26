
import { TType } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { mkAction } from "../typecheck/model/action";
import { onUpdate } from "../state";
import { Block } from "../component/Block";
import Input from "../component/Input";
import { palette } from "./color";

export function TermType({ term, lens, parent }: TermProps<TType>): JSX.Element {
  return <Block
    color={palette.type}
    shape="U"
    parent={parent}
  >
    <Input value={term.type} onChange={v => onUpdate(mkAction({
      action: 'override',
      backup: { ...term },
      term: { term: 'type', type: v },
    }, lens))} />
  </Block>
}


