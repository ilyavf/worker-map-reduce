const Task = require('data.task')
const simulateCalculation = require('worker-task-runner/src/utils/simulate-calc')

// TYPES:
// Page = Object { url:String, text:String }
// PageRank = Object { url:String, rank:Number }

// fetchPage :: String -> Task Page
const calcLength = url =>
  new Task((reject, resolve) => {
    simulateCalculation(1000);
    console.log('- resolving for ' + url);
    resolve({url, rank: url.length})
  })

// mapper :: a -> Task b
const mapperUrlLength = url =>
  calcLength(url)

module.exports = mapperUrlLength
