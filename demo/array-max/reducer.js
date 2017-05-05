const Task = require('data.task')

// calcSum :: PageRank -> PageRank -> Task PageRank
// const calcSum = a => b => Task.of(a.rank >= b.rank ? a : b)
const getMax = acc => b =>
(
  //console.log('el = ' + b),
  Task.of(acc > b ? acc : b)
)

// Define the initial value that reducer runner will use:
getMax.initialValue = -Infinity

module.exports = getMax
