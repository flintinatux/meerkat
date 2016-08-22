const assoc = require('ramda/src/assoc')

const { combine, mount } = require('./lib/redux')
const layout   = require('./views/layout')
const reducers = require('./ducks')
const route    = require('./lib/route')
const views    = require('./views')

const reducer = combine(assoc('route', route.reducer, reducers))

const view = route.router('/counter', {
  '/counter': layout(views.counter),
  '/forms':   layout(views.forms),
  '/http':    layout(views.http),
  '/inputs':  layout(views.inputs),
  '/random':  layout(views.random),
  '/sockets': layout(views.sockets),
  '/time':    layout(views.time)
})

mount(document.getElementById('root'), { reducer, view })
