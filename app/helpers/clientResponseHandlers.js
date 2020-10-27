const errorFormat = (code=404, msg) => ({
  status: "ERROR",
  code: code,
  message: msg,
  data: []
});

const successFormat = (code=200, msg, result="") => ({
  status: "OK",
  code: code,
  message: msg,
  data: result
});

module.exports = { errorFormat, successFormat }