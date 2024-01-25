import { TLet } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { TermGeneral } from "./TermGeneral";
import Row from "../component/Row";
import Column from "../component/Column";
import { Draggable } from "../component/Draggable";
import { joinLens } from "../typecheck/model/rec";
import { Block } from "../component/Block";
import Input from "../component/Input";
import { onUpdate } from "../state";
import { mkAction } from "../typecheck/model/action";

export function TermLet({ term, lens }: TermProps<TLet>): JSX.Element {
  const bodyLens = [...lens, 'body']
  return <Column>
    <Row>
      <Draggable id={'L' + joinLens(bodyLens)}>
        <Block>
          <Input value={term.id} onChange={v => onUpdate(mkAction({
            action: 'override',
            backup: { ...term },
            term: { ...term, id: v },
          }, lens))} />
        </Block>
      </Draggable>
      <TermGeneral term={term.body} lens={[...lens, 'body']} />
    </Row>
    <TermGeneral term={term.next} lens={[...lens, 'next']} />
  </Column>
}

