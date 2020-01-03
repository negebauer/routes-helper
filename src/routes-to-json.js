function routesToJson(routes) {
  const json = {}

  Object.keys(routes).forEach(routeKey => {
    const childRoutes = routes[routeKey]
    const childRoutesKeys = Object.keys(childRoutes)

    if (childRoutesKeys.length === 0) {
      json[routeKey] = childRoutes()
      return
    }

    json[routeKey] = routesToJson(childRoutes)
    json[routeKey].root = childRoutes()
  })

  return json
}

module.exports = routesToJson
