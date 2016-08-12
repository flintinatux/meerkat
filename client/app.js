const redux = require('./lib/redux')

const Main = require('./examples/04-random')

redux.mount(document.getElementById('root'), Main)
