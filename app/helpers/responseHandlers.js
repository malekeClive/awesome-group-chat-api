const errorFormat = (code, msg) => ({
  status: "ERROR",
  code: code,
  message: msg,
  data: []
});

const successFormat = (code, msg, result="") => ({
  status: "OK",
  code: code,
  message: msg,
  data: result
});

module.exports = { errorFormat, successFormat }