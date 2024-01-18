import { i18n } from "../../i18n";
import { Val } from "./value";

export abstract class CodeActionError {
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

export class ErrorChangeApply extends CodeActionError {
  toString(): string {
    return i18n.err.changeApply
  }
}

export abstract class TypecheckError {
  abstract toString(): string
}
