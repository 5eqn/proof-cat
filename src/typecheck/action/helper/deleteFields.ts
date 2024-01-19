import { Draft } from "immer"

export function deleteFields(draft: Draft<any>, keep: string = ''): void {
  for (const key in draft) {
    if (key !== keep) delete draft[key]
  }
}
