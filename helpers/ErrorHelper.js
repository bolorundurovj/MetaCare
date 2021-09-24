const Logger = require('../config/logger');

class ErrorHandler extends Error {
  constructor(error, statusCode = 500) {
    super();
    this.error = error;
    this.statusCode = statusCode;
  }
}

const handleError = (err, res) => {
  let error;
  let statusCode;

  if (err instanceof Error || typeof err === 'string' || err instanceof String) {
    error = err.error;
    statusCode = err.statusCode || 500;
  } else {
    error = err.message;
    statusCode = 500;
  }

  if (!error) {
    const keys = Object.keys(err);

    if (keys.length > 0 && err.message) {
      error = err.message;
    } else if (!err.message) {
      error = JSON.stringify(err);
    } else {
      error = 'An error occurred on the server.';
    }
  }

  statusCode = statusCode || 500;

  if (statusCode >= 500) {
    Logger.error(err);
  } else if (statusCode >= 400 && statusCode < 500) {
    Logger.warn(error);
  } else {
    Logger.log(error);
  }

  res.status(statusCode).send({
    message: error
  });
};

module.exports = {
  ErrorHandler,
  handleError
};
