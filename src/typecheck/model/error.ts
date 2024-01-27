import { i18n } from "../../i18n";

export abstract class CodeActionError {
  abstract toString(): string
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
    return i18n.err.invalidLens
  }
}
