import { TApp } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import { TermGeneral } from "./TermGeneral";
import Text from "../component/Text";
import Row from "../component/Row";
import Column from "../component/Column";

export function TermApp({ term, lens }: TermProps<TApp>): JSX.Element {
  const args = term.arg.map((t, i) => <div>
    <Row>
      <Text text={term.argID[i]} />
      <TermGeneral term={t} lens={[...lens, 'arg', i.toString()]} />
    </Row>
  </div>)
  return <Block>
    <Column>
      <TermGeneral term={term.func} lens={[...lens, 'func']} />
      <Column>
        {args}
      </Column>
    </Column>
  </Block>
}

