import { InferRequest } from "./infer";
import { Term } from "./term";
import { Val } from "./value";

// Props of a rendered component
export interface TermPropsBase<T extends Term> {
  req: InferRequest<T>
  type: Val,
}
