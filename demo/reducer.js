const Task = require('data.task')

// calcSum :: PageRank -> PageRank -> Task PageRank
const calcSum = a => b => Task.of(a.rank >= b.rank ? a : b)

calcSum.initialValue = {rank: -Infinity}

module.exports = calcSum
