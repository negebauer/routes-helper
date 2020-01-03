const buildRoutes = require('./build-routes')
const routesToJson = require('./routes-to-json')

describe('routesToJson', () => {
  describe('with string paths', () => {
    it('creates a correct json routes object', () => {
      const testRoutesObject = { me: '', me2: 'me3', me4: undefined }
      const routesObject = buildRoutes(testRoutesObject)
      const json = routesToJson(routesObject)

      expect(json.me).toEqual('/me')
      expect(json.me2).toEqual('/me3')
      expect(json.me4).toEqual('/me4')
    })
  })

  describe('with object paths', () => {
    it('creates a correct json routes object', () => {
      const testRoutesObject = {
        users: {
          another: '',
          someThing: { __pathName: 'some-thing' },
        },
      }
      const routesObject = buildRoutes(testRoutesObject)
      const json = routesToJson(routesObject)

      expect(json.users.root).toEqual('/users')
      expect(json.users.another).toEqual('/users/another')
      expect(json.users.someThing).toEqual('/users/some-thing')
    })
  })
})
