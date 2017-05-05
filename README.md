# worker-map-reduce
MapReduce with Web Workers

This is a MapReduce for a browser. Uses Web Workers to run tasks in parallel.

Features (see Release Notes in the bottom):
- Spawn limited number of workers.
- Mapper and reducer tasks are sent to workers. (REDUCER NOT YET)
- Send a new task to a worker as soon as it gets free. (ALMOST)
- Fault tolerance: if a worker fails with a runtime exception, its task will be resent. (NOT YET)

WorkerMapReduce uses Task from `data.task` module and immutable list from `immutable`.

On how to use `SharedArrayBuffer` to pass data to workers more effectively see demo `demo/array-max/` as well as
`worker-task-runner` examples.
Multiple workers can work with the same `SharedArrayBuffer` as long as they operate on different parts of the buffer.

## Intro

#### Two models of parallelism
- Data parallelism  **<<< current use case with parallelized mappers**
  - the same task is executed several times in parallel on different elements of the same dataset.
- Task parallelism
  - different tasks are executed in parallel.

#### Use cases
- Small data, expensive calculation   **<<< main demo**
  - can pass data via `postMessage`
- Large data, fast calculation
  - no benefit to send data with `postMessage`
    - consider retrieving data by the spawned process itself (e.g. from api)
  - use `SharedArrayBuffer`
- Large data, slow calculation   **<<< demo/array-max**
  - use `SharedArrayBuffer`

## Usage

#### Main demo
The task is:
- given an array of strings
- run an expensive calculation (is simulated) per string (with a provided mapper function)
- and calculate a sum in the provided reducer.

To see the demo load `demo/index.html` in browser and open the console. You will see something like:
```
[mapReduceWorker] starting: list.size=5, workerPoolSize=3
...
Exec: took 2.243 seconds.
Result: 73
```

#### Example
To try it your self you need to create two modules that export a task: a mapper and a reducer.
Then create your app:
```js
// Main MapReduce module:
const mapReduce = require('worker-map-reduce/src/map-reduce')

// Your reducer module that given a data returns a Task:
const reducer = require('./reducer')

// Your mapper (given a data returns a Task) module name that will be loaded
// via a module loader (StealJS) into a worker:
const mapperUrl = 'demo/mapper'

// Data array:
const array = [1, 2, 3]

// Main app:
const app = mapReduce(mapperUrl, reducer, array)

app.fork(err => console.log("Error: ", err),
         res => console.log("Result: ", res))
```

#### Parallelizing a task for MapReduce

The simplest example of applying MapReduce to an array of data so that a mapper is executed for every element.
But this is not often the case.

What you can do is:
- Divide your data into chunks.
- Run your mapper on every chunk of data in parallel.
- Run your reducer on the results collected from mappers.

See the following demo: `demo/array-max/`.

### Types and Signatures

_Note: Using Haskell notation_
```js
// Types:
//   Reducer a b = List a -> Task b
//   Mapper a b = a -> Task b

// mapReduce :: MapperUrl -> Reducer a b -> List a -> Task b
// mapReduce :: String -> (List a -> Task b) -> ListData a -> Task b
const mapReduce = require("worker-map-reduce")

// mapper :: a -> Task b
const mapper = require('your-mapper-module')

// reducer :: List a -> Task b
const reducer = require('your-reducer-module')
```


## Release Notes
- `0.0.2` Worker pool:
  - Schedule tasks for all available workers.
  - Once the whole pool of workers is done, schedule the next bunch of tasks.
- `0.0.1` Initial version:
  - Send mapper tasks to workers, number of workers is the same as number of elements in data array.
  - Reducer task is executed inside the main app.
  - Uses `data.task` for asynchronous actions.