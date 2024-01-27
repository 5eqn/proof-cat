import { Block } from "../../component/Block";
import { Draggable } from "../../component/Draggable";
import Text from "../../component/Text";
import { i18n } from "../../i18n";
import { palette } from "../color";

export function DummyType(): JSX.Element {
  return <Draggable id="ABecomeType">
    <Block color={palette.type} shape="U">
      <Text text={i18n.term.type} />
    </Block>
  </Draggable>
}
