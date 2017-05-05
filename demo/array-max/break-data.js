const { Range } = require('immutable-ext')

// Type: TaskInfo = Object <start, limit, buffer>
// breakTestData :: Number -> ArrayBuffer -> List TaskInfo
const breakTestData = (amount, buffer) =>
  Range(0, amount)
    .map(makeTaskInfo( buffer.byteLength / amount ))
    .map(addBuffer(buffer))
    .toList()

const makeTaskInfo = size => index =>
  (
    {
      start: index * size,
      limit: size
    }
  )

const addBuffer = buffer => el =>
  (el.buffer = buffer, el)

module.exports = breakTestData
