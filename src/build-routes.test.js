const buildRoutes = require('./build-routes')

describe('buildRoutes', () => {
  describe('with string paths', () => {
    it('returns routes with provided paths', () => {
      const testRoutesObject = { me: 'me' }
      const result = buildRoutes(testRoutesObject)
      expect(result.me()).toEqual('/me')
    })
  })

  describe('with a custom root', () => {
    it('adds it to all routes', () => {
      const testRoot = 'some-path'
      const testRoutesObject = { me: 'me' }
      const result = buildRoutes(testRoutesObject, 'some-path')
      expect(result.me()).toEqual(`${testRoot}/me`)
    })
  })

  describe('with undefined paths', () => {
    it('returns routes with route key as path', () => {
      const testRoutesObject = { me: undefined }
      const result = buildRoutes(testRoutesObject)
      expect(result.me()).toEqual('/me')
    })
  })

  describe('with object paths', () => {
    it('returns routes building recursively using route key', () => {
      const testRoutesObject = {
        users: {
          another: undefined,
          another2: '',
        },
      }
      const result = buildRoutes(testRoutesObject)
      expect(result.users.another()).toEqual('/users/another')
      expect(result.users.another2()).toEqual('/users/another2')
    })
  })

  describe('with custom __pathName in object paths', () => {
    it('returns routes with the custom __pathName', () => {
      const testRoutesObject = {
        somePath: {
          __pathName: 'some-path',
          another: undefined,
        },
      }
      const result = buildRoutes(testRoutesObject)
      expect(result.somePath()).toEqual('/some-path')
      expect(result.somePath.another()).toEqual('/some-path/another')
    })
  })
})
