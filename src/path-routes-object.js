/**
 * Gets the routes object and path from different valid calls.
 * The two valid ways to perform the call are:
 *
 * - Without providing a path: `pathRoutesObject(routesObject)`
 * - Providing a path: `pathRoutesObject('/path', routesObject)`
 * @param {string | Object} pathOrRoutesObject
 * @param {Object} routesObject
 * @return {Object} { path, routesObject }
 */
function pathRoutesObject(pathOrRoutesObject, posibleRoutesObject) {
  const providedPath = typeof pathOrRoutesObject === 'string'
  const result = {
    path: providedPath ? pathOrRoutesObject : undefined,
    routesObject: providedPath ? posibleRoutesObject : pathOrRoutesObject,
  }

  const { routesObject } = result
  if (!routesObject || typeof routesObject !== 'object') {
    throw new Error('Must provide a routesObject object')
  }

  return result
}

module.exports = pathRoutesObject
