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
const mapWorker = require('./map-worker')
const reduceAsync = require('./reduce-async')

// mapReduceWorker :: String -> Reducer -> Input
const mapReduceWorker = (mapperUrl, reducer, list) =>
(
  console.log('[mapReduceWorker] starting...'),
  reduceAsync(reducer, mapWorker(list.size, mapperUrl, list))
)

module.exports = mapReduceWorker
