import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          youHaveProven: 'You have proven:',
          uni: 'Universe',
          pi: 'Pi',
          func: 'Func',
          type: 'Type',
          num: 'Number',
          apply: 'Apply',
          let: 'Let',
          referred: 'This variable is referred to, so you cannot edit it!',
          varNotExist: 'This variable does not exist in context!',
          variableMismatch: 'Variable mismatch',
          numMismatch: 'Number mismatch',
          typeMismatch: 'Type mismatch',
          astMismatch: 'AST mismatch',
          invalidLens: 'Invalid Lens',
          noUndo: 'Nothing to undo!',
          noRedo: 'Nothing to redo!',
        },
      },
      zh: {
        translation: {
          youHaveProven: '你证明了：',
          uni: '宇宙',
          pi: '蕴含',
          func: '假设引入',
          type: '命题',
          num: '数字',
          apply: '蕴含消除',
          let: '创建依赖',
          referred: '该变量已被引用，故不可修改！',
          varNotExist: '语境中没有该变量！',
          variableMismatch: '变量不同',
          numMismatch: '数字不同',
          typeMismatch: '类型不同',
          astMismatch: '概念不同',
          invalidLens: '访问器不合法',
          noUndo: '没有操作可以撤销！',
          noRedo: '没有操作可以重做！',
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  })

export default i18n
