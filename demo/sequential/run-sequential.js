const { List } = require('immutable-ext')
const mapReduceSeq = require('./map-reduce-seq')
const mapper = require('../mapper')
const reducer = require('../reducer')
const { execTask } = require('worker-task-runner/src/helpers')
const testData = require('../data')

const list = List(testData)

const app = mapReduceSeq(mapper, reducer, list)

console.log('Running sequential mapReduce');

execTask(app)
