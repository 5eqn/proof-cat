import { TNum } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { mkAction } from "../typecheck/model/action";
import { onUpdate } from "../state";
import { Block } from "../component/Block";
import Input from "../component/Input";

export function TermNum({ term, lens }: TermProps<TNum>): JSX.Element {
  return <Block>
    <Input value={term.num.toString()} onChange={v => onUpdate(mkAction({
      action: 'override',
      backup: { ...term },
      term: { term: 'num', num: +v },
    }, lens))} />
  </Block>
}

