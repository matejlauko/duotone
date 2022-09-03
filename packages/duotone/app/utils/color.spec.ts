import { isValidColor, getColorFormat, setColorFormat } from './color'

const hex = '#08d6a3'
const hex8 = '#08d6a3ff'
const hex8a = '#08d6a380'
const rgb = 'rgb(8, 214, 163)'
const rgba = 'rgba(8, 214, 163, 0.5)'
const hsl = 'hsl(165, 93%, 44%)'
const hsla = 'hsla(165, 93%, 44%, 0.5)'
const colname = 'red'

describe('color', () => {
  describe('isValidColor', () => {
    it('is valid color', () => {
      expect(isValidColor(hex)).toBe(true)
      expect(isValidColor(hex8)).toBe(true)
      expect(isValidColor(colname)).toBe(true)
      expect(isValidColor(rgb)).toBe(true)
      expect(isValidColor(rgba)).toBe(true)
      expect(isValidColor(hsl)).toBe(true)
    })

    it('not valid color', () => {
      expect(isValidColor('lslfd')).toBe(false)
      expect(isValidColor('kf ds fdsf kdsf kds')).toBe(false)
      expect(isValidColor('kof sd #fff g')).toBe(false)
      expect(isValidColor('kof sd rgba(255,255,255,0.25) fds')).toBe(false)
    })
  })

  describe('getColorFormat', () => {
    test('hex format', () => {
      expect(getColorFormat(hex)).toBe('hex')
    })
    test('hex8 format', () => {
      expect(getColorFormat(hex8)).toBe('hex8')
    })

    test('rgb format', () => {
      expect(getColorFormat('rgb(200, 200, 200)')).toBe('rgb')
      expect(getColorFormat('rgba(200, 200, 200, 0.4)')).toBe('rgb')
    })

    test('hsl format', () => {
      expect(getColorFormat('hsl(0, 50%, 100%)')).toBe('hsl')
      expect(getColorFormat('hsla(0, 50%, 100%, 0.5)')).toBe('hsl')
    })
  })

  describe('setColorFormat', () => {
    test('to hex', () => {
      expect(setColorFormat(hex, 'hex')).toBe(hex)
      expect(setColorFormat(hex8, 'hex')).toBe(hex)
      expect(setColorFormat(hex8a, 'hex')).toBe(hex8a)
      expect(setColorFormat(rgb, 'hex')).toBe(hex)
      expect(setColorFormat(rgba, 'hex')).toBe(hex8a)

      expect(setColorFormat(hsl, 'hex')).toBe('#08d9a4')
      expect(setColorFormat(hsla, 'hex')).toBe('#08d9a480')

      expect(setColorFormat(colname, 'hex')).toBe('#ff0000')
    })

    test('to hex8', () => {
      expect(setColorFormat(hex, 'hex8')).toBe(hex8)
      expect(setColorFormat(hex8, 'hex8')).toBe(hex8)
      expect(setColorFormat(hex8a, 'hex8')).toBe(hex8a)
      expect(setColorFormat(rgb, 'hex8')).toBe(hex8)
      expect(setColorFormat(rgba, 'hex8')).toBe(hex8a)

      expect(setColorFormat(hsl, 'hex8')).toBe('#08d9a4ff')
      expect(setColorFormat(hsla, 'hex8')).toBe('#08d9a480')

      expect(setColorFormat(colname, 'hex8')).toBe('#ff0000ff')
    })

    test('to rgb', () => {
      expect(setColorFormat(hex, 'rgb')).toBe(rgb)
      expect(setColorFormat(hex8, 'rgb')).toBe(rgb)
      expect(setColorFormat(hex8a, 'rgb')).toBe(rgba)
      expect(setColorFormat(rgb, 'rgb')).toBe(rgb)
      expect(setColorFormat(rgba, 'rgb')).toBe(rgba)

      expect(setColorFormat(hsl, 'rgb')).toBe('rgb(8, 217, 164)')
      expect(setColorFormat(hsla, 'rgb')).toBe('rgba(8, 217, 164, 0.5)')

      expect(setColorFormat(colname, 'rgb')).toBe('rgb(255, 0, 0)')
    })

    test('to hsl', () => {
      expect(setColorFormat(hex, 'hsl')).toBe(hsl)
      expect(setColorFormat(hex8, 'hsl')).toBe(hsl)
      expect(setColorFormat(hex8a, 'hsl')).toBe(hsla)
      expect(setColorFormat(rgb, 'hsl')).toBe(hsl)
      expect(setColorFormat(rgba, 'hsl')).toBe(hsla)

      expect(setColorFormat(hsl, 'hsl')).toBe(hsl)
      expect(setColorFormat(hsla, 'hsl')).toBe(hsla)

      expect(setColorFormat(colname, 'hsl')).toBe('hsl(0, 100%, 50%)')
    })
  })
})
