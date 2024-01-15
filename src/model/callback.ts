// Callback of code actions
import { message } from "antd";
import { Draft } from "immer";
import { DraftFunction } from "use-immer";

export type Callback<T> = (updater: DraftFunction<T>) => void

export function mapCallback<T, U>(
  cb: Callback<T>,
  f: (t: Draft<T>) => Draft<U>,
  guard?: string
): Callback<U> {
  return (updater) => {
    if (guard !== undefined) message.error(guard)
    else cb(draft => {
      updater(f(draft))
    })
  }
}
