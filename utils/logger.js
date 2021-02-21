const info = (...params) => {
  if(process.env.NODE_ENV !== 'test'){
    console.log("HMM")
    console.log(...params)
  }
}

const error = (...params) => {
  console.log("ERRRRORRR")
  console.error(...params)
}

module.exports = {
  info, error
}