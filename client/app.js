const redux = require('./lib/redux')

const Main = require('./examples/07-websockets')

redux.mount(document.getElementById('root'), Main)
