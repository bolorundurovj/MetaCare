const { ErrorHandler } = require('../helpers/ErrorHelper');

class MovieValidators {
  static validateCreateComment(req, res, next) {
    const {
      comment
    } = req.body;
    let message;

    if (!comment) {
      message = 'The comment is required.';
    } else if (comment.length > 500) {
      message = 'This comment is more than 500 characters';
    }

    if (message) {
      return next(new ErrorHandler(message, 400));
    } else {
      next();
    }
  }

  static validateGetMovieCharacters(req, res, next) {
    const { gender, sortKey, sortValue } = req.query;
    let message;

    if (
      gender &&
      String(gender).toLowerCase() !== 'male' &&
      String(gender).toLowerCase() !== 'female'
    ) {
      message = 'Gender can only be "male" or "female"';
    } else if (
      sortKey &&
      String(sortKey).toLowerCase() !== 'name' &&
      String(sortKey).toLowerCase() !== 'gender' &&
      String(sortKey).toLowerCase() !== 'height'
    ) {
      message = 'Sorting can only be by "name" or "gender" or "height"';
    } else if (
      sortValue &&
      String(sortValue).toLowerCase() !== 'asc' &&
      String(sortValue).toLowerCase() !== 'desc'
    ) {
      message = 'Sorting can only be in "asc" or "desc" order';
    }

    if (message) {
      return next(new ErrorHandler(message, 400));
    } else {
      next();
    }
  }
}

module.exports = MovieValidators;
