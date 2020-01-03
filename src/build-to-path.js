const pathToRegexp = require('path-to-regexp')

const toPathCache = {}

/**
 * Calls the cached path-to-regexp function for the provided route
 * for generating paths. If there's no compiled function for the route
 * then it compiles it before calling it.
 *
 * @param {string} route A route
 * @param {Object} params Params to pass to path-to-regexp to build the path
 */
function toPathCached(route, params) {
  if (!toPathCache[route]) toPathCache[route] = pathToRegexp.compile(route)
  return toPathCache[route](params)
}

/**
 * Builds a routes similar object that binds to calls to generate paths
 * using `path-to-regexp`. This allows the generation of routes
 * that include parameters.
 *
 * Example
 *
 * ```js
 * const routes = buildRoutes({
 *  users: {
 *    user: { __pathName: ':userId' }
 *  }
 * })
 *
 * const toPath = buildToPath(routes)
 *
 * toPath.users.user({ userId: 1 })
 * // /users/1
 * ```
 *
 * @param {Object} routes The result of calling `buildRoutes` on a routes object
 */
function buildToPath(routes) {
  const routesToPathObject = {}

  Object.keys(routes).forEach(routeKey => {
    const getRoute = routes[routeKey]
    const route = getRoute()
    routesToPathObject[routeKey] = function toPath(params) {
      return toPathCached(route, params)
    }

    const childRoutesToPath = buildToPath(getRoute)
    Object.keys(childRoutesToPath).forEach(childRouteKey => {
      routesToPathObject[routeKey][childRouteKey] =
        childRoutesToPath[childRouteKey]
    })
  })

  return routesToPathObject
}

module.exports = buildToPath
