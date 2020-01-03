/**
 * Transforms a routes object created by `buildRoutes` into json.
 * This allows users to choose to use the function version (`routes.users()`)
 * or the json version (`routes.users.root`)
 *
 * @param {Object} routes Routes created by `buildRoutes`
 */
function routesToJson(routes) {
  const json = {}

  Object.keys(routes).forEach(routeKey => {
    const getRoute = routes[routeKey]
    const childRoutesKeys = Object.keys(getRoute)

    if (childRoutesKeys.length === 0) {
      json[routeKey] = getRoute()
      return
    }

    json[routeKey] = routesToJson(getRoute)
    json[routeKey].root = getRoute()
  })

  return json
}

module.exports = routesToJson
