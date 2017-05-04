// Note: steal adds `process` to global, and Task checks it.
window.process.nextTick = setTimeout

const { List } = require('immutable-ext')
const mapReduceWorker = require('./map-reduce-worker')
const reducer = require('./reducer')
const { execTask } = require('worker-task-runner/src/helpers')
const testData = require('./data')

const mapperUrl = 'demo/mapper'

const list = List(testData)

const app = mapReduceWorker(mapperUrl, reducer, list)

execTask(app)
