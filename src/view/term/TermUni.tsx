import { TUni } from "../../typecheck/model/term";
import { TermProps } from "../../typecheck/model/props";
import { Block } from "../../component/Block";
import Text from "../../component/Text";
import { i18n } from "../../i18n";
import { palette } from "../color";

export function TermUni({ parent }: TermProps<TUni>): JSX.Element {
  return <Block color={palette.type} shape="U" parent={parent}>
    <Text text={i18n.term.uni} />
  </Block>
}

