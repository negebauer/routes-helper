/**
 * Builds routes from a raw object of routes
 *
 * ```js
 * buildRoutes({
 *  home: {__pathName: '' },
 *  users: {
 *    user: {
 *      __pathname: ':userId',
 *      friends: '',
 *    }
 *  }
 * })
 * ```
 *
 * Would return an object that allows generating routes as follows:
 *
 * - `routes.home()` => `/`
 * - `routes.users()` => `/users`
 * - `routes.users.user()` => `/users/:userId`
 * - `routes.users.user.friends()` => `/users/:userId/friends`
 *
 * @param {Object} rawRoutes
 * @param {string?} [root]
 */
function buildRoutes(rawRoutes, root = '') {
  const routesObject = {}

  Object.keys(rawRoutes).forEach(routeKey => {
    const childRoutesObjectOrString = rawRoutes[routeKey]

    if (
      typeof childRoutesObjectOrString === 'string' ||
      !childRoutesObjectOrString
    ) {
      routesObject[routeKey] = function getRoute() {
        return `${root}/${childRoutesObjectOrString || routeKey}`
      }
      return
    }

    const { __pathName, ...childRoutesObject } = childRoutesObjectOrString
    const path =
      typeof __pathName === 'string'
        ? `${root}/${__pathName}`
        : `${root}/${routeKey}`
    if (Object.keys(childRoutesObject).length === 0) {
      routesObject[routeKey] = function getRoute() {
        return path
      }
      return
    }

    routesObject[routeKey] = function getRoute() {
      return path
    }
    const builtChildRoutes = buildRoutes(childRoutesObject, path)
    Object.keys(builtChildRoutes).forEach(childRouteKey => {
      routesObject[routeKey][childRouteKey] = builtChildRoutes[childRouteKey]
    })
  })

  return routesObject
}

module.exports = buildRoutes
