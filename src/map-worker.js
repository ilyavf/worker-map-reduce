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
// const log = require('worker-task-runner/src/utils/logger')

// Module that StealJS will load:
const workerUrl = 'worker-task-runner/src/worker'

// mapWorker :: Number -> String -> List a -> Task List b
const mapWorkers = (poolSize, taskUrl, data) =>
(
  console.log(`mapWorkers (poolSize=${poolSize}, taskUrl=${taskUrl}, data.size=${data.size})`),
  createWorkerPool(poolSize)
  .chain(scheduleWorkers(taskUrl, data))
)

// createWorkerPool :: Number -> Task List Worker
const createWorkerPool = poolSize =>
(
  // console.log(`createWorkerPool (${poolSize})`),
  List.empty.setSize(poolSize)
  .traverse(Task.of, () => create(workerUrl))
)

// scheduleWorkersBucket :: String -> List a -> List Worker -> Task List b
const scheduleWorkersBucket = (taskUrl, data) => workers =>
(
  console.log(`scheduleWorkersBucket ( taskUrl=${taskUrl}, data.size=${data.size}, workers.size=${workers.size} )`),
  data.zip(workers)
  .traverse(Task.of, ([data, worker]) =>
    runTask(worker, taskUrl)(data)
  )
)

/**
 * Schedules tasks for available workers. Once the 1st bucket done, schedule the next bucket.
 * @param {String} taskUrl A URL to the task script
 * @param {List} list Data
 * @param {List} workers A list of workers
 */
// scheduleWorkers :: String -> List a -> List Worker -> Task List b
const scheduleWorkers = (taskUrl, list) => workers =>
(
  // console.log(`scheduleWorkers for ${taskUrl} list=${list.size} workers=${workers.size}`),
  scheduleWorkersTillDone(
    List.empty,
    scheduleWorkersBucket(taskUrl, list.take(workers.size))(workers),
    list.skip(workers.size),
    workers,
    taskUrl
  )
)

/**
 * Stage 1: do M tasks, once done, do next M, etc.
 */
// scheduleWorkersTillDone :: List a -> Task List Worker -> Task List b -> List Worker -> String
const scheduleWorkersTillDone = (results, taskList, listLeft, workers, taskUrl) =>
(
  // console.log(`scheduleWorkersTillDone: results.size=${results.size}, listLeft=${listLeft.size}, workers.size=${workers.size}, taskUrl=${taskUrl}`),
  listLeft.size === 0
    ? taskList.map(a => results.concat(a))
    : taskList.chain(res =>
        scheduleWorkersTillDone(
          results.concat(res),
          scheduleWorkersBucket(taskUrl, listLeft.take(workers.size))(workers),
          listLeft.skip(workers.size),
          workers,
          taskUrl
        )
    )
)

module.exports = mapWorkers
