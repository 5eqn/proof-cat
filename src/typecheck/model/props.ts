import { Lens } from "./action";
import { Term } from "./term";

export interface TermProps<T extends Term> {
  term: T,
  lens: Lens
}
