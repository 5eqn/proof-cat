import cloneDeep from 'lodash.clonedeep'
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
    onRemove(1, term)
    onRevertRemove(0, backup, term)
    expect(term).toStrictEqual(tPiAfter)
  })

  test('should revert remove definition', () => {
    const term = cloneDeep(tLetAfter)
    const backup = { ...term }
    onRemove(1, term)
    onRevertRemove(0, backup, term)
    expect(term).toStrictEqual(tLetAfter)
  })

  test('should revert remove arguments applied', () => {
    const term = cloneDeep(tAppAfter)
    const backup = { ...term }
    onRemove(1, term)
    onRevertRemove(1, backup, term)
    expect(term).toStrictEqual(tAppAfter)
  })

  test('should make uni any', () => {
    const term = cloneDeep(tUniAfter)
    const backup = { ...term }
    onRemove(0, term)
    onRevertRemove(0, backup, term)
    expect(term).toStrictEqual(tUniAfter)
  })
})
