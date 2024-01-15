import { Term } from "../model/term"
import { Val } from "../model/value"
import { evaluateType } from "./type"

describe('evaluateType function', () => {
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
    const val = evaluateType(mockTType)
    expect(val).toStrictEqual(mockVType)
  })
})

