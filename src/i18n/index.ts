const lang = 'en';
const source = {
  en: {
    term: {
      pi: 'Pi',
      to: 'To',
    },
    err: {
      referred: 'This variable is referred to, so you cannot edit it!',
      empty: 'This action is forbidden with an empty input!',
      callNonFunc: 'This term is not a function, so you cannot call it!',
      nameDup: 'This name already exists in context, so you cannot redeclare it!',
    },
    prompt: {
      addAnEntry: 'Add an entry',
      entryName: 'Entry name',
      selectAnEntry: 'Select an entry',
    }
  }
}
export const i18n = source[lang]
