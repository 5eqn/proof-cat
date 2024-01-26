import { TermProps } from "../typecheck/model/props";
import { Term } from "../typecheck/model/term";
import { TermAny } from "./TermAny";
import { TermApp } from "./TermApp";
import { TermFunc } from "./TermFunc";
import { TermLet } from "./TermLet";
import { TermNum } from "./TermNum";
import { TermPi } from "./TermPi";
import { TermType } from "./TermType";
import { TermUni } from "./TermUni";
import { TermVar } from "./TermVar";

export function TermGeneral({ term, lens, parent }: TermProps<Term>) {
  switch (term.term) {
    case 'any':
      return <TermAny term={term} lens={lens} parent={parent} />
    case 'pi':
      return <TermPi term={term} lens={lens} parent={parent} />
    case 'func':
      return <TermFunc term={term} lens={lens} parent={parent} />
    case 'app':
      return <TermApp term={term} lens={lens} parent={parent} />
    case 'let':
      return <TermLet term={term} lens={lens} parent={parent} />
    case 'type':
      return <TermType term={term} lens={lens} parent={parent} />
    case 'var':
      return <TermVar term={term} lens={lens} parent={parent} />
    case 'num':
      return <TermNum term={term} lens={lens} parent={parent} />
    case 'uni':
      return <TermUni term={term} lens={lens} parent={parent} />
  }
}
