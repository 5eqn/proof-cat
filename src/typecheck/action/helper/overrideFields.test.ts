import { TAny, TNum } from "../../model/term"
import { overrideFields } from "./overrideFields"

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
    overrideFields(obj, obj2 as any)
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
    overrideFields(term, term2 as any)
    expect(term).toStrictEqual(term2)
  })

  test('should be able to work as deleteFields', () => {
    const term: TNum = {
      term: 'num',
      num: 114,
    }
    overrideFields(term, {} as any)
    expect(term).toStrictEqual({})
  })
})
