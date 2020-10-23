const errorFormat = (msg) => ({
  status: "ERROR",
  message: msg,
  data: []
});

const successFormat = (msg, result) => ({
  status: "OK",
  message: msg,
  data: result
});

module.exports = { errorFormat, successFormat }