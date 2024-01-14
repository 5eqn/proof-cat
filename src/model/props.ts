/*******
 MODEL
 *******/
import {InferRequest} from "./infer/model";
import {Val} from "./value";

// Props of a rendered component
export interface TermPropsBase<T> {
    req: InferRequest<T>
    type: Val,
}