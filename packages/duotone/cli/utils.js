/**
 * @param {string} path
 * @return {string}
 */
export function cleanupWindowsPath(path) {
  return path.replace(/\\/g, '/')
}

/** @param {string} n */
export const strToInt = (n) => parseInt(n, 10)
