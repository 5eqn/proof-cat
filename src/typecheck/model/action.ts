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
  envLen: number,
}

export type ActionWrapFunc = {
  action: 'wrapFunc',
  name: string,
  envLen: number,
}

export type ActionWrapPi = {
  action: 'wrapPi',
  name: string,
  envLen: number,
}

export type ActionWrapLet = {
  action: 'wrapLet',
  name: string,
  envLen: number,
}

export type ActionAddParam = {
  action: 'addParam',
  id: string,
  ix: number,
  envLen: number,
}

export type ActionIdentity = {
  action: 'identity',
}

export type ActionRemove = {
  action: 'remove',
  envLen: number,
  // Should be shallow-copied from term before deletion
  // Deletion process should not change deeper values except deleteVar
  backup: Term,
}

export type Action =
  | ActionRemove
  | ActionIdentity
  | ActionUpdateVar
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

export type ActionPack<T, U> = {
  action: Action,
  lens: (draft: Draft<T>) => Draft<U>,
  undo: boolean,
}

export function revertAction<T, U>(
  { action, lens, undo }: ActionPack<T, U>
): ActionPack<T, U> {
  return { action, lens, undo: !undo }
}

export function mapAction<T, U, V>(
  { action, lens, undo }: ActionPack<U, V>,
  f: (draft: Draft<T>) => Draft<U>
): ActionPack<T, V> {
  const newLens = (draft: Draft<T>) => lens(f(draft))
  return {
    action,
    lens: newLens,
    undo,
  }
}

export function mkAction<T>(
  action: Action,
  undo: boolean = false
): ActionPack<T, T> {
  return {
    action,
    lens: (draft: Draft<T>) => draft,
    undo,
  }
}
