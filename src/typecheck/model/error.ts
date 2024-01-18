import { i18n } from "../../i18n";
import { Val } from "./value";

abstract class CodeActionError {
  abstract toString(): string
}

export class ErrorCallNonFunc extends CodeActionError {
  funcType: Val

  constructor(funcType: Val) {
    super()
    this.funcType = funcType
  }

  toString(): string {
    return i18n.err.callNonFunc
  }
}

export class ErrorReferredRaw extends CodeActionError {
  toString(): string {
    return i18n.err.referred
  }
}

export class ErrorChangeApply extends CodeActionError {
  toString(): string {
    return i18n.err.changeApply
  }
}
