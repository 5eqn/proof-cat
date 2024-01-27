import { Term } from "./term";
import {Lens} from "./lens";

export interface TermProps<T extends Term> {
  term: T,
  lens: Lens,
  parent?: string,
}
