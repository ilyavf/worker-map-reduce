const Task = require('data.task')
const simulateCalculation = require('worker-task-runner/src/utils/simulate-calc')

// TYPES:
// Page = Object { url:String, text:String }
// PageRank = Object { url:String, rank:Number }

// fetchPage :: String -> Task Page
const fetchPage = url =>
  // Task.of({url, text: url.replace(/[plrc]./g, ' ')})
  new Task((reject, resolve) => {
    simulateCalculation(1);
    console.log('- resolving for ' + url);
    resolve({url, text: url.replace(/[plrc]./g, ' ')})
  })

// countWords :: Page -> Task PageRank
const countWords = page => Task.of({url: page.url, text: page.text, rank: page.text.split(' ').length})

// mapper :: a -> Task b
const mapperPageRank = url =>
  fetchPage(url)
  .chain(countWords)

module.exports = mapperPageRank
