This is a sequential mapReduce without parallelization.

To test it run using node:

```
$ node src/async/run-sequential.js
Running sequential mapReduce
...
Exec: took 5.004 seconds.
Result:  { url: 'http://google.com', text: 'htt //goog . m', rank: 4 }
```