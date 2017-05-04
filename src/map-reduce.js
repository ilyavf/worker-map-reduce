/**
 * Asynchronous map-reduce with a Web Worker
 *
 * @param Function mapper
 * @param Function reducer
 * @param List arr Input array data
 *
 * TYPES:
 *    Mapper a b :: a -> Task b
 *    Reducer a b :: b -> a -> Task b
 *    Input a :: List a
 */
const mapWorkers = require('./map-worker')
const reduceAsync = require('./reduce-async')

// mapReduceWorker :: String -> Reducer -> Input -> Number -> IO()
const mapReduceWorker = (mapperUrl, reducer, list, workerPoolSize=2) =>
(
  console.log(`[mapReduceWorker] starting: list.size=${list.size}, workerPoolSize=${workerPoolSize}`),
  reduceAsync(reducer, mapWorkers(workerPoolSize, mapperUrl, list))
)

module.exports = mapReduceWorker
