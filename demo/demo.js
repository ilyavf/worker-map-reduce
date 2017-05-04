// Note: steal adds `process` to global, and Task checks it.
window.process.nextTick = setTimeout

const { List } = require('immutable-ext')
const mapReduce = require('../src/map-reduce')
const reducer = require('./reducer')
const { execTask } = require('worker-task-runner/src/helpers')
const testData = require('./data')

const mapperUrl = 'demo/mapper'

const list = List(testData)

const app = mapReduce(mapperUrl, reducer, list)

execTask(app)
