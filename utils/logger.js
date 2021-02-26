const info = (...params) => {
  if(process.env.NODE_ENV !== 'test'){
    console.log(...params)
  }
}

const error = (...params) => {
  if(process.env.NODE_ENV === 'test'){
    console.log('\x1b[33m','Generated in test mode.', '\n', ...params)
  } else {
    console.error(...params)
  }
}

module.exports = {
  info, error
}