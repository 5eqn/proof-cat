import { Term } from "./term"
import { Val } from "./value"

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

export type ActionRemove = {
  action: 'remove',
  envLen: number,
  // Should be shallow-copied from term before deletion
  // Deletion process should not change deeper values except deleteVar
  backup: Term,
}

export type ActionOverride = {
  action: 'override',
  term: Term,
  backup: Term,
}

export type Action =
  | ActionOverride
  | ActionRemove
  | ActionWrapApp
  | ActionWrapFunc
  | ActionWrapPi
  | ActionWrapLet

// TODO move to rec folder
export type Lens = string[]

export type ActionPack = {
  action: Action,
  lens: Lens,
  undo: boolean,
}

export function revertAction(
  { action, lens, undo }: ActionPack
): ActionPack {
  return { action, lens, undo: !undo }
}

export function mkAction(
  action: Action,
  lens: Lens = [],
  undo: boolean = false,
): ActionPack {
  return {
    action,
    lens,
    undo,
  }
}
