import { quote } from "."
import { Term } from "../model/term"
import { Val } from "../model/value"

describe('quoteApp function', () => {
  const func: Val = {
    val: 'app',
    arg: { val: 'any' },
    func: { val: 'any' },
  }

  const expected: Term = {
    term: 'app',
    arg: { term: 'any' },
    func: { term: 'any' },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should quote args and func', () => {
    const val = quote(0, func)
    expect(val).toStrictEqual(expected)
  })
})
