import { useTranslation } from "react-i18next";
import { Block } from "../../component/Block";
import { Draggable } from "../../component/Draggable";
import Text from "../../component/Text";
import { palette } from "../color";

export function DummyNum(): JSX.Element {
  const { t } = useTranslation()
  return <Draggable id="ABecomeNum">
    <Block color={palette.num} >
      <Text text={t('num')} />
    </Block>
  </Draggable>
}
