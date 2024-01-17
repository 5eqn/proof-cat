import { i18n } from "../i18n";
import { Err } from "./model/error";

export function showError(err: Err): string {
  switch (err.err) {
    case 'callNonFunc': return i18n.err.callNonFunc
  }
}
