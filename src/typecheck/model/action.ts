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

export type ActionUpdateNum = {
  action: 'updateNum',
  oldNum: number,
  newNum: number,
}

export type ActionUpdateType = {
  action: 'updateType',
  oldType: string,
  newType: string,
}

export type ActionBecomeNum = {
  action: 'becomeNum',
  num: number,
}

export type ActionBecomeType = {
  action: 'becomeType',
  name: string,
}

export type ActionBecomeU = {
  action: 'becomeU',
}

export type ActionBecomeVar = {
  action: 'becomeVar',
  id: string,
  ix: number,
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
  id: string,
  ix: number,
  // Length including env length and param length
  len: number,
}

export type Action = ActionUpdateVar
  | ActionUpdateNum
  | ActionUpdateType
  | ActionBecomeNum
  | ActionBecomeType
  | ActionBecomeU
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

export function mapAction(
  { action, lens, undo }: ActionPack,
  f: (draft: Draft<Term>) => Draft<Term>
) {
  const newLens = (draft: Draft<Term>) => lens(f(draft))
  return {
    action,
    lens: newLens,
    undo,
  }
}

export function mkAction(action: Action, undo: boolean = false): ActionPack {
  return {
    action,
    lens: (draft: Draft<Term>) => draft,
    undo,
  }
}
