import { TNum } from "../../typecheck/model/term";
import { TermProps } from "../../typecheck/model/props";
import { mkAction } from "../../typecheck/model/action";
import { Block } from "../../component/Block";
import Input from "../../component/Input";
import { palette } from "../color";
import {onUpdate} from "../../state/onUpdate";

export function TermNum({ term, lens }: TermProps<TNum>): JSX.Element {
  return <Block color={palette.num} >
    <Input value={term.num.toString()} onChange={v => onUpdate(mkAction({
      action: 'override',
      backup: { ...term },
      term: { term: 'num', num: +v },
    }, lens))} />
  </Block>
}

