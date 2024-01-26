import { TApp } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import { TermGeneral } from "./TermGeneral";
import Row from "../component/Row";
import Column from "../component/Column";
import { palette } from "./color";

export function TermApp({ term, lens }: TermProps<TApp>): JSX.Element {
  const color = palette.app
  return <Block color={color} >
    <Column>
      <TermGeneral term={term.func} lens={[...lens, 'func']} parent={color} />
      <Column>
        <Row>
          <TermGeneral term={term.arg} lens={[...lens, 'arg']} parent={color} />
        </Row>
      </Column>
    </Column>
  </Block>
}

