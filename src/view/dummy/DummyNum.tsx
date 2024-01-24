import { Block } from "../../component/Block";
import { Draggable } from "../../component/Draggable";
import Text from "../../component/Text";
import { i18n } from "../../i18n";

export function DummyNum(): JSX.Element {
  return <Draggable id="ABecomeNum">
    <Block>
      <Text text={i18n.prompt.becomeNum} />
    </Block>
  </Draggable>
}

