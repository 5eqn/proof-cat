import { TFunc } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import { TermGeneral } from "./TermGeneral";
import Text from "../component/Text";
import { Draggable } from "../component/Draggable";
import { joinLens } from "../typecheck/model/rec";
import Row from "../component/Row";
import Column from "../component/Column";

export function TermFunc({ term, lens }: TermProps<TFunc>): JSX.Element {
  const params = term.param.map((t, i) => {
    const paramLens = [...lens, 'param', i.toString()]
    return <Row>
      <Draggable id={joinLens(paramLens)}>
        <Block>
          <Text text={term.paramID[i]} />
        </Block>
      </Draggable>
      <TermGeneral term={t} lens={paramLens} />
    </Row>
  })
  return <Block>
    <Column>
      <Column>
        {params}
      </Column>
      <TermGeneral term={term.body} lens={[...lens, 'body']} />
    </Column>
  </Block>
}

