/**
 * Compares two shallow object and
 * returns an object containing different values in rhs.
 */
export function objectDiff(
  lhs: Record<string, any>,
  rhs: Record<string, any>
): Record<string, any> {
  const res: Record<string, any> = {}

  for (const key in lhs) {
    if (lhs[key] !== rhs[key]) {
      res[key] = rhs[key]
    }
  }

  return res
}

/**
 * Set give value deep in object by given path.
 * Path is string with keys, child branches delimited by dots.
 */
export function setInPath<T = Record<string, any>>(
  // @ts-ignore
  target: T = {},
  path: string,
  val: any
): T {
  const parts = path.split('.')
  const [head, ...tail] = parts

  if (Array.isArray(target)) {
    const index = path.match(/\[([\d]+)\]/)?.[1]

    if (index === undefined) return target

    const _target = [...target]
    const indexNum = parseInt(index, 10)

    if (!tail.length) {
      _target[indexNum] = val
    } else {
      _target[indexNum] = setInPath(_target[indexNum], tail.join('.'), val)
    }

    return _target as unknown as T
  }

  if (!tail.length) {
    return { ...target, [path]: val }
  }

  return {
    ...target,
    [head]: setInPath((target as any)[head], tail.join('.'), val),
  }
}

/**
 * Travesrse deep object and filter branches by given predicate - compares keys.
 */
export function filterDeepByKey<T = Record<string, any>>(
  target: T,
  filterFn: (key: string) => boolean
): T {
  let res: T = {} as T

  for (const key in target) {
    if (filterFn(key)) {
      res[key] = target[key]
    } else if (typeof target[key] === 'object') {
      const matchesInside = filterDeepByKey(target[key], filterFn)

      res =
        filterFn(key) || Object.keys(matchesInside).length
          ? setInPath(res, key, matchesInside)
          : res
    }
  }

  return res
}
