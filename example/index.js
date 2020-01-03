/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const buildRoutes = require('../src/build-routes')
const routesToJson = require('../src/routes-to-json')

const output = path.resolve(__dirname, 'routes.json')

const routes = buildRoutes({
  home: { __pathName: '' },
  feed: 'cool-feed',
  session: {
    login: '',
  },
  dashboard: {
    graphs: '',
    charts: '',
  },
  users: {
    user: {
      __pathName: ':userId',
      friends: '',
    },
  },
  bestPlaces: {
    __pathName: 'best_places',
    place: ':placeId',
  },
})

const json = routesToJson(routes)

console.log('# routes object')
console.log(routes)

console.log('# json routes object')
console.log(json)

console.log('\n# examples')
console.log(`routes.home()\n\t${routes.home()}`)
console.log(`routes.users.user.friends()\n\t${routes.users.user.friends()}`)

fs.writeFileSync(output, `${JSON.stringify(json, null, 2)}\n`)
