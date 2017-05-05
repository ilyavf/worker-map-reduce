/**
 * Simple demo of finding a max value in array of bytes (Int8Arr).
 * - Generate array of `numberOfItems` items.
 * - Break the array into `numberOfChunks` chunks for parallelization,
 *   one mapper task will process one chunk of data.
 * - Run MapReduce on the `chunkedDataInfo` array which contains:
 *    - `start` - index where to start in the buffer;
 *    - `limit` - amount of items of the buffer;
 *    - `buffer` - the shared array buffer of all data.
 */

// Note: steal adds `process` to global, and Task checks it.
window.process.nextTick = setTimeout

const mapReduce = require('../../src/map-reduce')
const reducer = require('./reducer')
const { execTask } = require('worker-task-runner/src/helpers')
const makeData = require('./make-data')
const chunkTestData = require('./break-data')

// Define the mapper URL:
const mapperUrl = 'demo/array-max/mapper'

// CONFIG:
const numberOfItems = 1000 * 1000
const numberOfChunks = 5
const numberOfWorkers = 3

// Generate data array:
console.log('Started to generate data...'); let start = Date.now()
const data = makeData(numberOfItems)
console.log('... generated. Took: ' + ((Date.now() - start) / 1000).toFixed(2) + ' seconds')

// Break test data into chunks for parallelization:
// [ { start: 0, limit: 10, buffer }, ... ]
const chunckedDataInfo = chunkTestData(numberOfChunks, data.buffer)

const app = mapReduce(mapperUrl, reducer, chunckedDataInfo, numberOfWorkers)

console.log('***************************')
console.log('Starting app!')
console.log(`- numberOfItems = ${numberOfItems}, \n- numberOfChunks = ${numberOfChunks}, \n- numberOfWorkers = ${numberOfWorkers}`)
console.log('Data: ', data.arr8)

execTask(app)
