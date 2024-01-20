// Request for infer
import { Env } from "./env";
import { Ctx } from "./ctx";
import { Val } from "./value";

import { Term } from "./term";
import { Lens } from "./action";

export type InferRequest<T extends Term> = {
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
  lens: Lens<Term, T>,
}

// Result after inferring the type of a term
export type InferResult = {
  // Inferred type value
  val: Val,
  // Element to be rendered for this inference
  element: JSX.Element
  // Values for testing
  debug?: any
}

// Get elements from result
export function getElements(res: InferResult[]) {
  return res.map(({ element }) => element)
}

// Get values from result
export function getVals(res: InferResult[]) {
  return res.map(({ val }) => val)
}

// Get debugs from result
export function getDebugs(res: InferResult[]) {
  return res.map(({ debug }) => debug)
}
