const assoc = require('ramda/src/assoc')

const { combine, mount } = require('./lib/redux')
const reducers = require('./ducks')
const route    = require('./lib/route')
const views    = require('./views')

const reducer = combine(assoc('route', route.reducer, reducers))

const view = route.router('/counter', {
  '/counter': views.counter,
  '/forms':   views.forms,
  '/http':    views.http,
  '/inputs':  views.inputs,
  '/random':  views.random,
  '/sockets': views.sockets,
  '/time':    views.time
})

mount(document.getElementById('root'), { reducer, view })
