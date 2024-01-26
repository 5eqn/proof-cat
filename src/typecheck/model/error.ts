import { i18n } from "../../i18n";
import { pretty } from "../pretty";
import { quote } from "../quote";
import { Val } from "./value";

export abstract class CodeActionError {
  abstract toString(): string
}

export class ErrorCallNonFunc extends CodeActionError {
  ns: string[]
  funcType: Val

  constructor(ns: string[], funcType: Val) {
    super()
    this.ns = ns
    this.funcType = funcType
  }

  toString(): string {
    return `${i18n.err.callNonFunc}: ${pretty(this.ns, quote(this.ns.length, this.funcType))}`
  }
}

export class ErrorLengthMismatch extends CodeActionError {
  toString(): string {
    return i18n.err.lengthMismatch
  }
}

export class ErrorNamespaceMismatch extends CodeActionError {
  toString(): string {
    return i18n.err.namespaceMismatch
  }
}

export class ErrorASTMismatch extends CodeActionError {
  toString(): string {
    return i18n.err.astMismatch
  }
}

export class ErrorVariableMismatch extends CodeActionError {
  toString(): string {
    return i18n.err.variableMismatch
  }
}

export class ErrorTypeMismatch extends CodeActionError {
  toString(): string {
    return i18n.err.typeMismatch
  }
}

export class ErrorNumMismatch extends CodeActionError {
  toString(): string {
    return i18n.err.numMismatch
  }
}

export class ErrorReferredRaw extends CodeActionError {
  toString(): string {
    return i18n.err.referred
  }
}

export class ErrorInvalidLens {
  toString(): string {
    return "Lens is invalid"
  }
}
