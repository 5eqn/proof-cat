// Closure to avoid HOAS
import {Env} from "./env";
import {Term} from "./term";
import {Val} from "./value";

import {evaluate} from "../evaluate";

export type Closure = {
    env: Env,
    body: Term,
}

// Apply a closure
export function apply(closure: Closure, arg: Val[]) {
    return evaluate([...arg, ...closure.env], closure.body)
}