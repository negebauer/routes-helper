const fs = require('fs')
const path = require('path')

const output = path.resolve(__dirname, 'output.json')

const routes = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    a: 1,
    b: 2,
  },
}

// eslint-disable-next-line no-console
console.dir(routes)

fs.writeFileSync(output, `${JSON.stringify(routes, null, 2)}\n`)
