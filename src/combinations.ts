const stateToValue = (input: any[], state: number[]): any[] => {
  return [...state.map(elementIndex => input[elementIndex])]
}

export const combinations = (input: any[], count: number): any[] => {
  if (input.length < count) {
    return []
  }
  const results = []
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

  results.push(stateToValue(input, state))

  while (JSON.stringify(state) !== stringifiedFinalState) {
    if (state[cursor] !== finalState[cursor]) {
      state[cursor] += 1
      results.push([...state])
    } else {
      while (state[cursor] === finalState[cursor]) {
        cursor -= 1
        if (cursor < 0) {
          throw Error('PANIC - state cursor out of bounds')
        }
      }

      state[cursor] += 1

      for (let i = cursor + 1; i <= maxCursor; i++) {
        state[i] = state[i - 1] + 1
      }

      results.push(stateToValue(input, state))

      cursor = maxCursor
    }
  }

  return results
}
