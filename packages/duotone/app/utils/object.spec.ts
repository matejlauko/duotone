import { filterDeepByKey, setInPath } from './object'

describe('setInPath', () => {
  test('sets value in object 1 level path', () => {
    expect(setInPath({ a: 1 }, 'a', 2)).toEqual({ a: 2 })
  })

  test('sets value in object 1 level path - non-existant', () => {
    expect(setInPath({}, 'a', 2)).toEqual({ a: 2 })
  })

  test('sets value in object 2 level path', () => {
    expect(setInPath({ a: { b: 1, c: 3 } }, 'a.b', 2)).toEqual({ a: { b: 2, c: 3 } })
  })

  test('sets value in object 2 level path - non-existant', () => {
    expect(setInPath({}, 'a.b', 2)).toEqual({ a: { b: 2 } })
  })

  test('sets value in object 3 level path', () => {
    expect(setInPath({ a: { b: { c: 1 } }, d: 3 }, 'a.b.c', 2)).toEqual({
      a: { b: { c: 2 } },
      d: 3,
    })
  })

  test('sets value in object 3 level path - non-existant', () => {
    expect(setInPath({}, 'a.b.c', 2)).toEqual({ a: { b: { c: 2 } } })
  })

  test('sets value in array 1 level path', () => {
    expect(setInPath(['a'], '[0]', 'b')).toEqual(['b'])
  })

  test('sets value in array 2 level path', () => {
    expect(setInPath([['a', 'b'], ['d']], '[0].[1]', 'c')).toEqual([['a', 'c'], ['d']])
  })
})

describe('filterDeepByKey', () => {
  test('filters object 1 level path', () => {
    expect(filterDeepByKey({ a: 1, b: 2 }, (key) => key === 'a')).toEqual({ a: 1 })
  })

  test('filters object 2 level path', () => {
    expect(
      filterDeepByKey({ a: { o: 1 }, b: 2, c: { a: 3 }, d: { b: 4 } }, (key) => key === 'a')
    ).toEqual({
      a: { o: 1 },
      c: { a: 3 },
    })
  })
})
