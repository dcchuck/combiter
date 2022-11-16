const stateToValue = <T>(input: T[], state: number[]): T[] => {
  // TODO is it faster to always parse/stringify? or check first
  return [
    ...state.map(
      (elementIndex) => JSON.parse(JSON.stringify(input[elementIndex])) as T
    ),
  ]
}

/**
 * From an Array `input`, create all possible combinations of size `count`
 * @param input Array of element to create combinations from
 * @param count Size of combintations to choose from input. If greater than input length, returns empty Array.
 * @returns Array of arrays of combinations, each with "count" members.
 */
export const combinations = <T>(input: T[], count: number): T[][] => {
  /**
   * This creates a "state" which is an array of integers which represent indexes of elements in
   * the input array. It then iterates over the state, and at each unique state - i.e. each unique
   * combination of elements from the input array - pushes that element to a result array.
   * 
   * We achieve this by tracking a cursor across the state. Starting at the end, we iterate towards
   * the end of the input array. Once we hit the end, we step back one element (the 2nd to last in this
   * case), increment that element, and reset its followers. This pattern continues left to right, like so
   * 5 Choose 3 ->
   * 1, 2, 3 -> 1, 2, 4 -> 1, 2, 5 -> 1, 3, 4 -> ... -> 3, 4, 5
   * In this case, '3, 4, 5' is the "final state". The algorithm iterates forward until it hits that point,
   * at which point we have collected all combinations
   */
  if (input.length < count) {
    return []
  }
  const results: T[][] = []
  const maxCursor = count - 1
  const state = []
  const finalState = []
  // seed the beginning state
  for (let i = 0; i < count; i++) {
    state[i] = i
  }
  // seed the final state
  for (let i = 0; i < count; i++) {
    finalState[i] = input.length - count + i
  }
  // cache the stringified value of the final state for future comparisons
  const stringifiedFinalState = JSON.stringify(finalState)

  // add the current state as a value to the results
  results.push(stateToValue<T>(input, state))

  // start the cursor at the end
  let cursor = maxCursor

  while (JSON.stringify(state) !== stringifiedFinalState) {
    if (cursor > maxCursor) {
      throw Error("PANIC - state cursor out of bounds. cursor > maxCursor")
    }

    if (state[cursor] !== finalState[cursor]) {
      state[cursor] += 1
      results.push(stateToValue<T>(input, state))
    } else {
      while (state[cursor] === finalState[cursor]) {
        cursor -= 1
        if (cursor < 0) {
          throw Error("PANIC - state cursor out of bound. cursor < 0")
        }
      }

      state[cursor] += 1

      for (let i = cursor + 1; i <= maxCursor; i++) {
        state[i] = state[i - 1] + 1
      }

      results.push(stateToValue<T>(input, state))

      cursor = maxCursor
    }
  }

  return results
}
