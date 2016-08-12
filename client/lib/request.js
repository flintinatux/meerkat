const req = require('browser-request')

const Task = require('./task')

module.exports = (opts) =>
  Task((rej, res) => req(opts, (err, _, body) => err ? rej(err) : res(body)))
