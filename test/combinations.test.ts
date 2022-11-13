import assert from 'node:assert'
import { describe, it } from 'node:test'

import { combinations } from '../src/combinations'

describe('combinations', () => {
  it('creates all necessary combos', () => {
    const example0 = [1,2,3]
    const result0 = combinations<number>(example0, 1)
    assert.equal(result0.length, 3)

    const example1 = [1,2,3]
    const result1 = combinations<number>(example1, 3)
    assert.equal(result1.length, 1)

    const example2 = [1,2,3,4,5,6]
    const result2 = combinations<number>(example2, 2)
    assert.equal(result2.length, 15)

    const example3 = [1,2,3,4,5,6,7,8,9,0]
    const result3 = combinations<number>(example3, 2)
    assert.equal(result3.length, 45)
  })

  it('returns an empty set for an out of bounds query', () => {
    assert.equal(combinations([1],2).length, 0)
  })

  it('returns the expected collections', () => {
    const example = ['a', 'b', 'c']
    const result = combinations<string>(example, 2)
    assert(result.find(item => item.includes('a') && item.includes('b')))
    assert(result.find(item => item.includes('a') && item.includes('c')))
    assert(result.find(item => item.includes('b') && item.includes('c')))
  })
})

