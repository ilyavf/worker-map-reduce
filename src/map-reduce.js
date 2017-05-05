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
const { List } = require('immutable-ext')
const mapWorkers = require('./map-worker')
const reduceAsync = require('./reduce-async')

// normalizeData :: Array a -> List a
const normalizeData = data =>
  List.isList(data) ? data : List(data)

// mapReduceWorker :: String -> Reducer -> Input -> Number -> IO()
const mapReduceWorker = (mapperUrl, reducer, data, workerPoolSize=2) =>
(
  console.log(`[mapReduceWorker] starting: list.size=${data.size}, workerPoolSize=${workerPoolSize}`),
  reduceAsync(reducer, mapWorkers(workerPoolSize, mapperUrl, normalizeData(data)))
)

module.exports = mapReduceWorker
