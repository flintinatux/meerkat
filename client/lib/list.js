const append  = require('ramda/src/append')
const assoc   = require('ramda/src/assoc')

const { combine, handle } = require('./redux')

exports.list = name => {
  const byId = handle({}, {
    [`Insert${name}`]: (state, model) => assoc(model.id, model, state)
  })

  const ids = handle([], {
    [`Insert${name}`]: (state, model) => append(model.id, state)
  })

  return combine({ byId, ids })
}

exports.mapList = (list, fn) => list.ids.map(id => fn(list.byId[id]))
