const Task = require('data.task')

// TYPES:
// ReducerAsync a b = b -> a -> Task b

// reduce :: ReducerAsync b a -> b -> List a -> Task b
const reduce = reducer => acc => list =>
  list.size === 0
    ? Task.of(acc)
    : reducer(acc)(list.first()).chain(a => reduce(reducer)(a)(list.shift()))

// reduceAsync :: ReducerAsync b a -> List a -> Task b
const reduceAsync = reducer => list =>
  reduce(reducer)(reducer.initialValue)(list)

module.exports = reduceAsync
