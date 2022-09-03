/**
 * Download code string as file in browser.
 */
export function downloadCode(filename: string, codeText: string) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(codeText))
  element.setAttribute('download', filename)
  element.style.display = 'none'

  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
