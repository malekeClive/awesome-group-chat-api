const modelErrorHandler = ( code, msg ) => ({
  error: true,
  code: code,
  message: msg
});

module.exports = { modelErrorHandler }