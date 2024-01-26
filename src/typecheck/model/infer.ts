// Request for infer
import { Env } from "./env";
import { Ctx } from "./ctx";
import { Val } from "./value";

import { Term } from "./term";
import { Rec } from "./rec";

export type InferRequest<T extends Term> = {
  // Current mapping from de-Bruijn index to value
  env: Env,
  // Current mapping from de-Bruijn index to type value
  ctx: Ctx,
  // Current names
  ns: string[],
  // Term to be inferred
  tm: T,
}

export type CheckRequest<T extends Term> = {
  // Current mapping from de-Bruijn index to value
  env: Env,
  // Current mapping from de-Bruijn index to type value
  ctx: Ctx,
  // Current names
  ns: string[],
  // Term to be checked
  tm: T,
  // Expected type
  expected: Val,
}

// Result after inferring the type of a term
export type InferResult = {
  // Inferred type value
  type: Val,
  // Current mapping from de-Bruijn index to value
  env: Env,
  // Current mapping from de-Bruijn index to type value
  ctx: Ctx,
  // Current names
  ns: string[],
  // Expected type value
  expected?: Val,
} & Rec

// Get values from result
export function getVals(res: InferResult[]) {
  return res.map(({ type }) => type)
}
