import { TNum } from "../../model/term"
import { deleteFields } from "./deleteFields"

describe('deleteFields function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should delete all fields from an object', () => {
    const obj = {
      a: 114,
      b: '514',
    }
    deleteFields(obj)
    expect(obj).toStrictEqual({})
  })

  test('should delete all fields from a term', () => {
    const term: TNum = {
      term: 'num',
      num: 114,
    }
    deleteFields(term)
    expect(term).toStrictEqual({})
  })

  test('should respect keep param', () => {
    const term: TNum = {
      term: 'num',
      num: 114,
    }
    deleteFields(term, 'num')
    expect(term).toStrictEqual({ num: 114 })
  })
})
