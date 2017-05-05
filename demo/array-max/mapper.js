const Task = require('data.task')
const simulateCalculation = require('worker-task-runner/src/utils/simulate-calc')

// findMax :: array -> Task a
const findMax = data =>
  new Task((reject, resolve) => {

    const arr8 = new Int8Array(data.buffer)

    let result = -Infinity;

    for (let i = 0; i < data.limit; i++) {
      const el = arr8[data.start + i]
      if (result < el) {
        result = el;
      }
    }

    // simulateCalculation(1000)
    resolve(result)
  })

module.exports = findMax
