const redux = require('./lib/redux')

const Main = require('./examples/05-http')

redux.mount(document.getElementById('root'), Main)
