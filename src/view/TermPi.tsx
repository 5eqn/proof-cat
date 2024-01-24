import { TPi } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import { TermGeneral } from "./TermGeneral";
import Text from "../component/Text";
import Row from "../component/Row";
import Column from "../component/Column";

export function TermPi({ term, lens }: TermProps<TPi>): JSX.Element {
  const params = term.param.map((t, i) => <Row>
    <Text text={term.paramID[i]} />
    <TermGeneral term={t} lens={[...lens, 'param', i.toString()]} />
  </Row>)
  return <Block>
    <Column>
      <Column>
        {params}
      </Column>
      <TermGeneral term={term.body} lens={[...lens, 'body']} />
    </Column>
  </Block>
}
