const compose = require('ramda/src/compose')
const K = require('ramda/src/always')

const Task = fork => ({
  fork,
  map: f => Task((rej, res) => fork(rej, compose(res, f))),
  toJSON:   K('[object Task]'),
  toString: K('[object Task]')
})

Task.of = x => Task((rej, res) => res(x))

module.exports = Task
