const lang = 'zh_proofAssistant';
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
      val: 'Value',
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
      wrapLet: 'x=val,*',
      wrapFunc: 'x=>*',
      wrapPi: 'x->*',
      wrapApp: 'x(arg)',
      becomeType: 'Type',
      becomeNum: 'Num',
      becomeVar: 'Var',
      becomeU: 'U',
    }
  },
  zh_proofAssistant: {
    term: {
      uni: '命题宇宙',
      pi: '蕴含',
      to: '后件',
      func: '假设引入',
      body: '下一步',
      type: '命题',
      num: '数字',
      any: '任意',
      apply: '蕴含消除',
      target: '蕴含式',
      var: '引用',
      ref: '依据',
      val: '值',
    },
    err: {
      referred: '该变量已被引用，故不可修改！',
      empty: '输入不可为空！',
      callNonFunc: '该式子不是蕴含式，不可应用蕴含消除！',
      nameDup: '该变量名在语境中已存在！',
      changeApply: '该蕴含式已被消除，故不可修改！',
      noVariable: '语境中没有合适的变量！',
      fromLenMismatch: (x: number, y: number) =>
        `蕴含前件长度不同：${x} 和 ${y}`,
      argLenMismatch: (x: number, y: number) =>
        `参数长度不同：${x} 和 ${y}`,
      variableMismatch: (xid: string, yid: string, xlvl: number, ylvl: number) =>
        `变量不同：${xid}-${xlvl} 和 ${yid}-${ylvl}`,
      numMismatch: (x: number, y: number) =>
        `数字不同：${x} != ${y}`,
      typeMismatch: (x: string, y: string) =>
        `类型不同：${x} != ${y}`,
      astMismatch: (x: string, y: string) =>
        `概念不同：${x} != ${y}`,
    },
    prompt: {
      addAnEntry: '增加一个前件',
      addLet: '定义一个辅助变量',
      addType: '让该变量成为一个命题',
      addNum: '让该变量成为一个数字',
      entryName: '变量名',
      name: '名字',
      value: '值',
      selectAnEntry: '选择一个变量',
      typeName: '命题名',
      wrapLet: '定义',
      wrapFunc: '假设引入',
      wrapPi: '蕴含',
      wrapApp: '蕴含消除',
      becomeType: '命题',
      becomeNum: '数字',
      becomeVar: '证毕',
      becomeU: '宇宙',
    }
  }
}
export const i18n = source[lang]
