import { TVar } from "../typecheck/model/term";
import { TermProps } from "../typecheck/model/props";
import { Block } from "../component/Block";
import Text from "../component/Text";

export function TermVar({ term }: TermProps<TVar>): JSX.Element {
  return <Block>
    <Text text={term.id} />
  </Block>
}
