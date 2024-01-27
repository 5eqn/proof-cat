import i18n from "../../i18n"

export abstract class CodeActionError {
  abstract toString(): string
}

export class ErrorASTMismatch extends CodeActionError {
  toString(): string {
    return i18n.t('astMismatch')
  }
}

export class ErrorVariableMismatch extends CodeActionError {
  toString(): string {
    return i18n.t('variableMismatch')
  }
}

export class ErrorTypeMismatch extends CodeActionError {
  toString(): string {
    return i18n.t('typeMismatch')
  }
}

export class ErrorNumMismatch extends CodeActionError {
  toString(): string {
    return i18n.t('numMismatch')
  }
}

export class ErrorReferredRaw extends CodeActionError {
  toString(): string {
    return i18n.t('referred')
  }
}

export class ErrorInvalidLens {
  toString(): string {
    return i18n.t('invalidLens')
  }
}
