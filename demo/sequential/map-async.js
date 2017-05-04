const Task = require('data.task')

// mapAsync :: (a -> Task b) -> List a -> Task List b
const mapAsync = (fTask, list) =>
  list.traverse(Task.of, fTask)

module.exports = mapAsync
