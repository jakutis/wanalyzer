import * as methods from './methods.js'

const method = process.argv[2]
const args = process.argv.slice(3)
if (!methods[method]) {
  throw new Error('Unknown method: ' + method)
}
methods[method](...args)
