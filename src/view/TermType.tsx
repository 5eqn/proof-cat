
import { TType } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { mkAction } from "../typecheck/model/action";
import { onUpdate } from "../state";
import { Block } from "../component/Block";
import Input from "../component/Input";

export function TermType({ term, lens }: TermProps<TType>): JSX.Element {
  return <Block>
    <Input value={term.type} onChange={v => onUpdate(mkAction({
      action: 'override',
      backup: { ...term },
      term: { term: 'type', type: v },
    }, lens))} />
  </Block>
}


