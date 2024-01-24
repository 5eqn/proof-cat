import { TUni } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import Text from "../component/Text";
import { i18n } from "../i18n";

export function TermUni(_: TermProps<TUni>): JSX.Element {
  return <Block>
    <Text text={i18n.term.uni} />
  </Block>
}

