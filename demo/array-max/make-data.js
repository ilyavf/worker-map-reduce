/**
 * Create a buffer for Int8Array which max value is 127 and populate it
 */

const makeArray = size => {
  const buffer = new SharedArrayBuffer(size)
  const arr8 = new Int8Array(buffer)
  arr8.forEach((a, i) => arr8[i] = i % 128)
  return {
    buffer,
    arr8
  };
}

module.exports = makeArray
