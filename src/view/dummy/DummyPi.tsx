import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";
import { i18n } from "../../i18n";
import { palette } from "../color";

export function DummyPi(): JSX.Element {
  return <Draggable id="AWrapPi">
    <Block color={palette.pi} shape='U' >
      <Column>
        <Row>
          <Block>
            <Text text={i18n.prompt.wrapPi} />
          </Block>
          <Text text=":" />
          <Block inset />
        </Row>
        <Block inset />
      </Column>
    </Block>
  </Draggable>
}
