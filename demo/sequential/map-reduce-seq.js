/**
 * Asynchronous map-reduce
 *
 * @param Function mapper
 * @param Function reducer
 * @param List arr Input array data
 *
 * TYPES:
 *    Mapper a b = a -> Task b
 *    Reducer a b = b -> a -> Task b
 *    Input a = List a
 */
const mapAsync = require('./map-async')
const reduceAsync = require('./reduce-async')

// mapReduceAsync :: Mapper a b -> Reducer b c -> Input a -> Task c
const mapReduceAsync = (mapper, reducer, list) =>
  mapAsync(mapper, list)
  .chain(reduceAsync(reducer))

module.exports = mapReduceAsync
