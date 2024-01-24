import { Block } from "../../component/Block";
import { Draggable } from "../../component/Draggable";
import Text from "../../component/Text";
import { i18n } from "../../i18n";

export function DummyType(): JSX.Element {
  return <Draggable id="ABecomeType">
    <Block>
      <Text text={i18n.prompt.becomeType} />
    </Block>
  </Draggable>
}
