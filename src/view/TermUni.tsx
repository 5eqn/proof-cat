import { TermPropsBase } from ".";
import { i18n } from "../i18n";
import { TUni } from "../model/term";
import { TermHeader } from "./TermHeader";

export interface TermUniProps extends TermPropsBase<TUni> { }

export function TermUni(props: TermUniProps) {
  return <TermHeader
    req={props.req}
    type={props.type}
    label={i18n.term.uni}
  />
}
