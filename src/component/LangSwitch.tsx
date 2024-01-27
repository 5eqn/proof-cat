import { useTranslation } from "react-i18next";
import Button from "./Button";

export function LangSwitch() {
  const { i18n } = useTranslation()
  const otherLangText = i18n.language === 'en' ? '中' : 'En'
  const otherLangVal = i18n.language === 'en' ? 'zh' : 'en'
  return <Button onClick={() => i18n.changeLanguage(otherLangVal)}>
    {otherLangText}
  </Button>
}
