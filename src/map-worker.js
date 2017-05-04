/**
 * Mapper Task Manager
 * This is a manager that creates a pool of workers and assigns mapper tasks to them.
 *
 * You can define the size of the pool (how many workers will be created). The manager
 * will wait for a worker to compete its task and assign a new task to it if there is one.
 */

const Task = require('data.task')
const { create, runTask } = require('worker-task-runner/src/helpers')
const { List } = require('immutable-ext')
const log = require('worker-task-runner/src/utils/logger')

// Module that StealJS will load:
const workerUrl = 'worker-task-runner/src/worker'

// mapWorker :: Number -> String -> List a -> Task List b
const mapWorker = (poolSize, taskUrl, data) =>
(
  console.log(`mapWorker (${poolSize}, ${taskUrl}, ${data.size})`),
  createWorkerPool(poolSize)
  .chain(scheduleWorkers(taskUrl, data))
)

// createWorkerPool :: Number -> Task List Worker
const createWorkerPool = poolSize =>
(
  console.log(`createWorkerPool (${poolSize})`),
  List.empty.setSize(poolSize)
  .traverse(Task.of, () => create(workerUrl))
)

// scheduleWorkers :: String -> List a -> List Worker -> Task List b
const scheduleWorkers = (taskUrl, data) => workers =>
(
  console.log(`scheduleWorkers (${taskUrl}, data=${data.size}, workers=${workers.size})`),
  // TODO: for now we worker pool size is the same as data size, so we run 1 worker per data entry.
  data.zip(workers).traverse(Task.of, ([data, worker]) => runTask(worker, taskUrl)(data))
  .map(log('--- after runTask resolved with'))
)

module.exports = mapWorker
