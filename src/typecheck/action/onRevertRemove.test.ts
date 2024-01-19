import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { Term } from "../model/term"
import { onRemove } from './onRemove'
import { onRevertRemove } from './onRevertRemove'

describe('onRevertRemove function', () => {
  const tPiAfter: Term = {
    term: 'pi',
    param: [
      {
        term: 'uni',
      },
    ],
    paramID: ['T'],
    body: {
      term: 'var',
      id: 'x',
      ix: 1,
    }
  }

  const tFuncAfter: Term = {
    term: 'func',
    param: [
      {
        term: 'uni',
      },
    ],
    paramID: ['T'],
    body: {
      term: 'var',
      id: 'x',
      ix: 1,
    }
  }

  const tAppAfter: Term = {
    term: 'app',
    arg: [
      {
        term: 'type',
        type: 'number',
      },
    ],
    argID: ['T'],
    func: {
      term: 'var',
      id: 'f',
      ix: 0,
    }
  }

  const tUniAfter: Term = {
    term: 'uni',
  }

  const tLetAfter: Term = {
    term: 'let',
    id: 'x',
    body: {
      term: 'num',
      num: 114,
    },
    next: {
      term: 'var',
      id: 'y',
      ix: 1,
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should revert remove pi params', () => {
    const term = cloneDeep(tPiAfter)
    const backup = { ...term }
    const action = mkAction<Term>({
      action: 'remove',
      envLen: 1,
      backup,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(tPiAfter)
  })

  test('should revert remove function params', () => {
    const term = cloneDeep(tFuncAfter)
    const backup = { ...term }
    const action = mkAction<Term>({
      action: 'remove',
      envLen: 1,
      backup,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(tFuncAfter)
  })

  test('should revert remove definition', () => {
    const term = cloneDeep(tLetAfter)
    const backup = { ...term }
    onRemove(1, term)
    onRevertRemove(backup, term)
    expect(term).toStrictEqual(tLetAfter)
  })

  test('should revert remove arguments applied', () => {
    const term = cloneDeep(tAppAfter)
    const backup = { ...term }
    onRemove(1, term)
    onRevertRemove(backup, term)
    expect(term).toStrictEqual(tAppAfter)
  })

  test('should make uni any', () => {
    const term = cloneDeep(tUniAfter)
    const backup = { ...term }
    onRemove(1, term)
    onRevertRemove(backup, term)
    expect(term).toStrictEqual(tUniAfter)
  })
})
