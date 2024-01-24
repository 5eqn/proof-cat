import { Block } from "../../component/Block";
import { Draggable } from "../../component/Draggable";
import Text from "../../component/Text";
import { i18n } from "../../i18n";

export function DummyUni(): JSX.Element {
  return <Draggable id="ABecomeUni">
    <Block>
      <Text text={i18n.prompt.becomeUni} />
    </Block>
  </Draggable>
}
