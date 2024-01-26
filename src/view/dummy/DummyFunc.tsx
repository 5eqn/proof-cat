import { Block } from "../../component/Block";
import Column from "../../component/Column";
import { Draggable } from "../../component/Draggable";
import Row from "../../component/Row";
import Text from "../../component/Text";
import { i18n } from "../../i18n";
import { palette } from "../color";

export function DummyFunc(): JSX.Element {
  return <Draggable id="AWrapFunc">
    <Block color={palette.func} shape='->' >
      <Column>
        <Row>
          <Block>
            <Text text={i18n.prompt.wrapFunc} />
          </Block>
          <Text text=":" />
          <Block inset />
        </Row>
        <Block inset />
      </Column>
    </Block>
  </Draggable>
}


