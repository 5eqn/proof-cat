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
    },
    err: {
      referred: 'This variable is referred to, so you cannot edit it!',
      empty: 'This action is forbidden with an empty input!',
      callNonFunc: 'This term is not a function, so you cannot call it!',
      nameDup: 'This name already exists in context, so you cannot redeclare it!',
      changeApply: 'This term is called as a function, so you cannot change it!',
      noVariable: 'There is no suitable variable in context!',
    },
    prompt: {
      addAnEntry: 'Add an entry',
      entryName: 'Entry name',
      selectAnEntry: 'Select an entry',
      typeName: 'Type name',
    }
  }
}
export const i18n = source[lang]
