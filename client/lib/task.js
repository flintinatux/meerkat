const compose = require('ramda/src/compose')

const { typeEq } = require('./util')

const Task = fork => ({
  fork,
  map: f => Task((rej, res) => fork(rej, compose(res, f)))
})

Task.is = typeEq('fork', 'function')

Task.of = x => Task((rej, res) => res(x))

module.exports = Task
