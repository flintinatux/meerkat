const redux = require('./lib/redux')

const Main = require('./examples/01-buttons')

redux.mount(document.getElementById('root'), Main)
