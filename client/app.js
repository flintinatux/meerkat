const redux = require('./lib/redux')

const Main = require('./examples/02-text-fields')

redux.mount(document.getElementById('root'), Main)
