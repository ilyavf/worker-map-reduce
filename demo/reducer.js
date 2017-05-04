const Task = require('data.task')

// calcSum :: PageRank -> PageRank -> Task PageRank
// const calcSum = a => b => Task.of(a.rank >= b.rank ? a : b)
const calcSum = acc => b => Task.of(acc + b.rank)

// calcSum.initialValue = {rank: -Infinity}
calcSum.initialValue = 0

module.exports = calcSum
