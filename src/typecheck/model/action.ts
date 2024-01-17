import { Draft } from "immer"
import { Term } from "./term"
import { Val } from "./value"

export type ActionUpdateVar = {
  action: 'updateVar',
  oldID: string,
  oldIX: number,
  newID: string,
  newIX: number,
}

export type ActionBecomeNum = {
  action: 'becomeNum',
  num: number,
}

export type ActionBecomeType = {
  action: 'becomeType',
  type: string,
}

export type ActionBecomeU = {
  action: 'becomeU',
}

export type ActionBecomeVar = {
  action: 'becomeVar',
  ns: string[],
}

export type ActionWrapApp = {
  action: 'wrapApp',
  funcType: Val,
}

export type ActionWrapFunc = {
  action: 'wrapFunc',
  name: string,
}

export type ActionWrapPi = {
  action: 'wrapPi',
  name: string,
}

export type ActionWrapLet = {
  action: 'wrapLet',
  name: string,
}

export type ActionAddParam = {
  action: 'addParam',
  name: string,
  ix: number,
  // Length including env length and param length
  len: number,
}

export type Action = ActionUpdateVar
  | ActionBecomeNum
  | ActionBecomeType
  | ActionBecomeU
  | ActionBecomeVar
  | ActionWrapApp
  | ActionBecomeVar
  | ActionWrapApp
  | ActionWrapFunc
  | ActionWrapPi
  | ActionWrapLet
  | ActionAddParam

export type ActionPack = {
  action: Action,
  lens: (draft: Draft<Term>) => Draft<Term>,
  undo: boolean,
}
