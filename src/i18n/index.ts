const lang = 'en';
const source = {
  en: {
    term: {
      uni: 'Universe',
      pi: 'Pi',
      to: 'To',
      func: 'Func',
      body: 'Body',
      type: 'Type',
      num: 'Number',
      any: 'Any',
      apply: 'Apply',
      target: 'Target',
      var: 'Variable',
      ref: 'Reference',
    },
    err: {
      referred: 'This variable is referred to, so you cannot edit it!',
      empty: 'This action is forbidden with an empty input!',
      callNonFunc: 'This term is not a function, so you cannot call it!',
      nameDup: 'This name already exists in context, so you cannot redeclare it!',
      changeApply: 'This term is called as a function, so you cannot change it!',
      noVariable: 'There is no suitable variable in context!',
      fromLenMismatch: (x: number, y: number) =>
        `Source of Pi has different length: ${x} and ${y}`,
      argLenMismatch: (x: number, y: number) =>
        `Arguments has different length: ${x} and ${y}`,
      variableMismatch: (xid: string, yid: string, xlvl: number, ylvl: number) =>
        `Variable mismatch: ${xid}-${xlvl} and ${yid}-${ylvl}`,
      numMismatch: (x: number, y: number) =>
        `Number mismatch: ${x} != ${y}`,
      typeMismatch: (x: string, y: string) =>
        `Type mismatch: ${x} != ${y}`,
      astMismatch: (x: string, y: string) =>
        `AST mismatch: ${x} != ${y}`,
    },
    prompt: {
      addAnEntry: 'Add an entry',
      addLet: 'Define a variable',
      addType: 'Make this variable a type',
      addNum: 'Make this variable a number',
      entryName: 'Entry name',
      name: 'Name',
      value: 'Value',
      selectAnEntry: 'Select an entry',
      typeName: 'Type name',
    }
  }
}
export const i18n = source[lang]
