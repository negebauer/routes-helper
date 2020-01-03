const pathRoutesObject = require('./path-routes-object')

const testPath = '/some-path'
const testRouterObject = { key: '/value' }

describe('pathRoutesObject', () => {
  describe('when provided with only a routesObject', () => {
    const result = pathRoutesObject(testRouterObject)

    it('returns valid routesObject', () => {
      expect(result.routesObject).toEqual(testRouterObject)
    })

    it('returns undefined path', () => {
      expect(result.path).toBeUndefined()
    })
  })

  describe('when provided with a path and routesObject', () => {
    const result = pathRoutesObject(testPath, testRouterObject)

    it('returns valid routesObject', () => {
      expect(result.routesObject).toEqual(testRouterObject)
    })

    it('returns undefined path', () => {
      expect(result.path).toEqual(testPath)
    })
  })

  describe('when provided with only a non object routesObject', () => {
    it('throws an error', () => {
      expect(() => pathRoutesObject('anything')).toThrow()
      expect(() => pathRoutesObject(1)).toThrow()
      expect(() => pathRoutesObject(true)).toThrow()
      expect(() => pathRoutesObject()).toThrow()
    })
  })

  describe('when provided with a path and a non object routesObject', () => {
    it('throws an error', () => {
      expect(() => pathRoutesObject(testPath, 'anything')).toThrow()
      expect(() => pathRoutesObject(testPath, 1)).toThrow()
      expect(() => pathRoutesObject(testPath, true)).toThrow()
      expect(() => pathRoutesObject(testPath)).toThrow()
    })
  })
})
