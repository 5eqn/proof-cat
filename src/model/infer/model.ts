// Request for infer
import {Env} from "../env";
import {Ctx} from "../ctx";
import {Val} from "../value";

import {Callback} from "../callback";

export type InferRequest<T> = {
    // Current mapping from de-Bruijn index to value
    env: Env,
    // Current mapping from de-Bruijn index to type value
    ctx: Ctx,
    // Current names
    ns: string[],
    // Depth of rendered component
    depth: number,
    // Term to be inferred
    term: T,
    // Callback of code actions
    onChange: Callback<T>,
}
// Result after inferring the type of a term
export type InferResult = {
    // Inferred type value
    val: Val,
    // Element to be rendered for this inference
    element: JSX.Element
}