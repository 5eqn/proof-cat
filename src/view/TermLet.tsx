import { TLet } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { TermGeneral } from "./TermGeneral";
import Text from "../component/Text";
import Row from "../component/Row";
import Column from "../component/Column";

export function TermLet({ term, lens }: TermProps<TLet>): JSX.Element {
  return <Column>
    <Row>
      <Text text={term.id} />
      <TermGeneral term={term.body} lens={[...lens, 'body']} />
    </Row>
    <TermGeneral term={term.next} lens={[...lens, 'next']} />
  </Column>
}

