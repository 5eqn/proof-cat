import { TApp } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import { TermGeneral } from "./TermGeneral";
import Row from "../component/Row";
import Column from "../component/Column";
import { palette } from "./color";

export function TermApp({ term, lens }: TermProps<TApp>): JSX.Element {
  return <Block color={palette.app} >
    <Column>
      <TermGeneral term={term.func} lens={[...lens, 'func']} />
      <Column>
        <Row>
          <TermGeneral term={term.arg} lens={[...lens, 'arg']} />
        </Row>
      </Column>
    </Column>
  </Block>
}

