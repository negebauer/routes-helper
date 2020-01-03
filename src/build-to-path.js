const pathToRegexp = require('path-to-regexp')

const toPathCache = {}

function toPathCached(route, params) {
  if (!toPathCache[route]) toPathCache[route] = pathToRegexp.compile(route)
  return toPathCache[route](params)
}

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
