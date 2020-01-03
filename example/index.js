/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const buildRoutes = require('../src/build-routes')
const routesToJson = require('../src/routes-to-json')
const buildToPath = require('../src/build-to-path')

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

const toPath = buildToPath(routes)

const json = routesToJson(routes)

console.log('# routes object')
console.log(routes)

console.log('# toPath object')
console.log(toPath)

console.log('# json routes object')
console.log(json)

console.log('\n# examples')
console.log(`routes.home()\n\t${routes.home()}`)
console.log(`routes.users.user.friends()\n\t${routes.users.user.friends()}`)
console.log(`toPath.home()\n\t`, toPath.home())
console.log(`toPath.users()\n\t`, toPath.users())
console.log(
  `toPath.users.user({ userId: 1 })\n\t`,
  toPath.users.user({ userId: 1 }),
)

fs.writeFileSync(output, `${JSON.stringify(json, null, 2)}\n`)
