// Atom type, `string`

import { Closure } from "./closure";

export type VType = {
  val: 'type',
  type: string,
}
// Function value, `\x => x`
export type VFunc = {
  val: 'func',
  param: Val,
  paramID: string,
  func: Closure
}
// Normalized application, `f(x)`
export type VApp = {
  val: 'app',
  func: Val,
  arg: Val,
}
// Function type, `(x: X) -> Y`
export type VPi = {
  val: 'pi',
  param: Val,
  paramID: string,
  func: Closure,
}
// Editable number
export type VNum = {
  val: 'num',
  num: number,
}
// Arbitrary type or value
export type VAny = {
  val: 'any',
}
// Variable
export type VVar = {
  val: 'var',
  lvl: number, // de-Bruijn level, 0 is the outermost variable
}
// Universe type, `U`
export type VUni = {
  val: 'uni'
}
// All possible values
export type Val = VType | VFunc | VApp | VNum | VAny | VPi | VVar | VUni
