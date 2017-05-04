# worker-map-reduce
MapReduce with Web Workers

This is a MapReduce for a browser. Uses Web Workers to run tasks in parallel.

Features (see Release Notes in the bottom):
- Spawn limited number of workers (NOT YET)
- Mapper and reducer tasks are sent to workers (REDUCER NOT YET)
- Send a new task to a worker as soon as it gets free
- Fault tolerance: if a worker fails with a runtime exception, its task will be resent (NOT YET)

WorkerMapReduce uses Task from `data.task` module and immutable list from `immutable`.

## Example

You need to create two modules that export a task: a mapper and a reducer. Then run:
```js
// Main MapReduce module:
const mapReduce = require('worker-map-reduce/src/map-reduce')

// Your reducer module that given a data returns a Task:
const reducer = require('./reducer')

// Your mapper (given a data returns a Task) module name that will be loaded
// via a module loader (StealJS) into a worker:
const mapperUrl = 'demo/mapper'

// Immutable list of data (`immutable-ext` adds `traverse` method):
const { List } = require('immutable-ext')

// Data:
const list = List([1, 2, 3])

// Main app:
const app = mapReduce(mapperUrl, reducer, list)

app.fork(err => console.log("Error: ", err),
         res => console.log("Result: ", res))

```

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
- `0.0.1` Initial version:
  - Send mapper tasks to workers, number of workers is the same as number of elements in data array.
  - Reducer task is executed inside the main app.
  - Uses `data.task` for asynchronous actions.