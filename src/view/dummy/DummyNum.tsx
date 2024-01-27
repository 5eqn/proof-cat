import { Block } from "../../component/Block";
import { Draggable } from "../../component/Draggable";
import Text from "../../component/Text";
import { i18n } from "../../i18n";
import { palette } from "../color";

export function DummyNum(): JSX.Element {
  return <Draggable id="ABecomeNum">
    <Block color={palette.num} >
      <Text text={i18n.term.num} />
    </Block>
  </Draggable>
}

