import { Draft } from "immer";
import { deleteFields } from "./deleteFields";

export function onOverride(draft: Draft<any>, to: any): void {
  deleteFields(draft)
  Object.assign(draft, to)
}
