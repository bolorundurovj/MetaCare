const shortId = require("shortid");
const { ErrorHandler } = require("../helpers/ErrorHelper");
const OutputFormatter = require("../helpers/OutputFormatterHelper");
const { Character, Comment, Movie } = require("../models");

class MovieCtrl {
  static async create(req, res, next) {
    const { body } = req;
    const {
      title,
      episodeId,
      openingCrawl,
      director,
      producers,
      releaseDate,
      referenceUrl,
    } = body;

    const movie = await Movie.findOne({ title: title });

    if (movie) {
      return next(new ErrorHandler("A movie exists with that name.", 409));
    }

    movie = new Movie({
      title,
      episodeId,
      openingCrawl,
      director,
      producers,
      releaseDate,
      referenceUrl,
    });

    await movie.save();

    res.status(201).send({
      data: {
        movie: movie,
      },
    });
  }

  /**
   * @route     GET /api/v1/movies/:movieId
   * @access    Public
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * For API Documentation
   * @api {get} /api/v1/movies/:movieId Get Single Movie
   * @apiVersion 1.0.0
   * @apiName Get Single Movie
   * @apiGroup Movie
   *
   * @apiDescription Get single movie details
   *
   * @apiParam (Url Parameters) {String} movieId Movie unique ID.
   */
  static async getSingleMovie(req, res, next) {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return next(new ErrorHandler("Movie does not exist.", 404));
    }

    res.status(200).send({
      data: {
        movie: OutputFormatter.formatMovie(movie),
      },
    });
  }
}

module.exports = MovieCtrl;
