const stateToValue = <T>(input: T[], state: number[]): T[] => {
  // TODO is it faster to always parse/stringify? or check first
  return [
    ...state.map((elementIndex) =>
      JSON.parse(JSON.stringify(input[elementIndex]))
    ),
  ]
}

export const combinations = <T>(input: T[], count: number): T[][] => {
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
  // TODO generate the string, no need to make an array to do this
  const stringifiedFinalState = JSON.stringify(finalState)
  console.log(stringifiedFinalState)
  // start at the end
  let cursor = maxCursor

  results.push(stateToValue<T>(input, state))

  while (JSON.stringify(state) !== stringifiedFinalState) {
    if (state[cursor] !== finalState[cursor]) {
      state[cursor] += 1
      results.push(stateToValue<T>(input, state))
    } else {
      while (state[cursor] === finalState[cursor]) {
        cursor -= 1
        if (cursor < 0) {
          throw Error("PANIC - state cursor out of bounds")
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
