import { TAny, TNum } from "../model/term"
import { onOverride } from "./onOverride"

describe('onOverride function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should override an object', () => {
    const obj = {
      a: 114,
      b: '514',
    }
    const obj2 = {
      c: 333,
    }
    onOverride(obj, obj2)
    expect(obj).toStrictEqual(obj2)
  })

  test('should override a term', () => {
    const term: TNum = {
      term: 'num',
      num: 114,
    }
    const term2: TAny = {
      term: 'any',
    }
    onOverride(term, term2)
    expect(term).toStrictEqual(term2)
  })

  test('should be able to work as deleteFields', () => {
    const term: TNum = {
      term: 'num',
      num: 114,
    }
    onOverride(term, {})
    expect(term).toStrictEqual({})
  })
})
