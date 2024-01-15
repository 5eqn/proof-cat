import { Term } from "../model/term"
import { Val } from "../model/value"
import { quoteType } from "./type"

describe('quoteType function', () => {
  // A type with long name
  const mockTType: Term = {
    term: 'type',
    type: 'Type with spaces and $pecia/ charac+ers'
  }

  // Expected result
  const mockVType: Val = {
    val: 'type',
    type: 'Type with spaces and $pecia/ charac+ers',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should preserve type info', () => {
    const val = quoteType(mockVType)
    expect(val).toStrictEqual(mockTType)
  })
})

