import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./deleteFields";

// Code action: anify
export function onOverride(draft: Draft<Term>, to: Term): void {
  deleteFields(draft)
  Object.assign(draft, to)
}
