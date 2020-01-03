const buildRoutes = require('./build-routes')
const buildToPath = require('./build-to-path')

function testBuildToPath(testRoutesObject) {
  const routes = buildRoutes(testRoutesObject)
  const result = buildToPath(routes)
  return result
}

describe('buildToPath', () => {
  describe('with string paths without parameters', () => {
    it('returns routes with provided paths', () => {
      const testRoutesObject = { user: '' }
      const toPath = testBuildToPath(testRoutesObject)
      expect(toPath.user()).toEqual('/user')
    })
  })

  describe('with string paths with parameters', () => {
    it('returns routes with provided paths', () => {
      const testRoutesObject = { user: { __pathName: ':userId' } }
      const toPath = testBuildToPath(testRoutesObject)
      expect(toPath.user({ userId: 1 })).toEqual('/1')
    })
  })

  describe('with object paths without parameters', () => {
    it('returns routes building recursively using route key', () => {
      const testRoutesObject = {
        users: {
          user: '',
        },
      }
      const toPath = testBuildToPath(testRoutesObject)
      expect(toPath.users.user()).toEqual('/users/user')
    })
  })

  describe('with object paths with parameters', () => {
    const testRoutesObject = {
      users: {
        user: { __pathName: ':userId' },
      },
    }
    const toPath = testBuildToPath(testRoutesObject)

    it('returns routes building recursively using route key', () => {
      expect(toPath.users.user({ userId: 1 })).toEqual('/users/1')
    })

    it('fails if called without required params', () => {
      expect(() => toPath.users.user()).toThrow()
    })
  })
})
