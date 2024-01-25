import cloneDeep from 'lodash.clonedeep'
import { Term } from "../model/term"
import { onRemove } from './onRemove'

describe('onRemove function', () => {
  const tPiBefore: Term = {
    term: 'pi',
    param: [
      {
        term: 'uni',
      },
    ],
    paramID: ['T'],
    body: {
      term: 'var',
      ix: 1,
    }
  }

  const tPiAfter: Term = {
    term: 'var',
    ix: 0,
  }

  const tAppBefore: Term = {
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
      ix: 0,
    }
  }

  const tAppAfter: Term = {
    term: 'var',
    ix: 0,
  }

  const tUniBefore: Term = {
    term: 'uni',
  }

  const tUniAfter: Term = {
    term: 'any',
  }

  const tLetBefore: Term = {
    term: 'let',
    id: 'x',
    body: {
      term: 'num',
      num: 114,
    },
    next: {
      term: 'var',
      ix: 1,
    }
  }

  const tLetAfter: Term = {
    term: 'var',
    ix: 0,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should remove pi params if not referred to', () => {
    const term = cloneDeep(tPiBefore)
    onRemove(1, term)
    expect(term).toStrictEqual(tPiAfter)
  })

  test('should remove definition if not referred to', () => {
    const term = cloneDeep(tLetBefore)
    onRemove(1, term)
    expect(term).toStrictEqual(tLetAfter)
  })

  test('should remove arguments applied', () => {
    const term = cloneDeep(tAppBefore)
    onRemove(1, term)
    expect(term).toStrictEqual(tAppAfter)
  })

  test('should make uni any', () => {
    const term = cloneDeep(tUniBefore)
    onRemove(0, term)
    expect(term).toStrictEqual(tUniAfter)
  })
})

