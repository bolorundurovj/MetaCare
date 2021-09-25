const Logger = require("../config/logger");
const { ErrorHandler } = require("../helpers/ErrorHelper");
const OutputFormatter = require("../helpers/OutputFormatterHelper");
const { Movie, Character, Comment } = require("../models");

class MovieCtrl {
  /**
   * @route     GET /api/v1/movies
   * @access    Public
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * For API Documentation
   * @api {get} /api/v1/movies Get All Movies
   * @apiVersion 1.0.0
   * @apiName Get All Movies
   * @apiGroup Movie
   *
   * @apiDescription Get all movies
   *
   * @apiSuccessExample {json} Success-Response Example:
   *  HTTP/1.1 200 OK
   *  {
   *    "data": {
   *      "movies": [
   *          {
   *              "id": 1,
   *              "title": "A New Hope",
   *              "episodeId": 4,
   *              "openingCrawl": "It is a period of civil war.\r\nRebel spaceships, st",
   *              "director": "George Lucas",
   *              "producers": [
   *                  "Gary Kurtz",
   *                  " Rick McCallum"
   *              ],
   *              "releaseDate": "1977-05-25T00:00:00.000Z",
   *              "comments": 0,
   *              "characters": 18
   *          },
   *          {
   *              "id": 2,
   *              "title": "The Empire Strikes Back",
   *              "episodeId": 5,
   *              "openingCrawl": "It is a dark time for the\r\nRebellion. Although the",
   *              "director": "Irvin Kershner",
   *              "producers": [
   *                  "Gary Kurtz",
   *                  " Rick McCallum"
   *              ],
   *              "releaseDate": "1980-05-17T00:00:00.000Z",
   *              "comments": 0,
   *              "characters": 16
   *          },
   *        ]
   * }
   * * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "message": "Error Message"
   *     }
   * 
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 500 Server Error
   *     {
   *       "message": "Error Message"
   *     }
   */
  static async getAllMovies(req, res, next) {
    Movie.findAll({
      order: [["releaseDate", "ASC"]],
      include: [
        {
          model: Character,
          as: "characters",
        },
        {
          model: Comment,
          as: "comments",
        },
      ],
    })
      .then((movies) => {
        res.status(200).send({
          data: {
            movies: movies.map((x) => OutputFormatter.formatMovie(x)),
          },
        });
      })
      .catch((err) => {
        Logger.error(err);
        res.status(500).send({
          message: "An error occurred retrieving movies",
        });
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
   *
   * @apiSuccessExample {json} Success-Response Example:
   *  HTTP/1.1 200 OK
   *   {
   *    "data": {
   *        "movie": {
   *            "id": 1,
   *            "title": "A New Hope",
   *            "episodeId": 4,
   *            "openingCrawl": "It is a period of civil war.\r\nRebel spaceships, st",
   *            "director": "George Lucas",
   *            "producers": [
   *                "Gary Kurtz",
   *                " Rick McCallum"
   *            ],
   *            "releaseDate": "1977-05-25T00:00:00.000Z",
   *            "comments": 0,
   *            "characters": 18
   *        }
   *    }
   *}
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "message": "Error Message"
   *     }
   * 
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 500 Server Error
   *     {
   *       "message": "Error Message"
   *     }
   */
  static async getSingleMovie(req, res, next) {
    const { movieId } = req.params;

    Movie.findByPk(movieId, {
      include: [
        {
          model: Character,
          as: "characters",
        },
        {
          model: Comment,
          as: "comments",
        },
      ],
    })
      .then((movie) => {
        if (!movie) {
          return next(new ErrorHandler("Movie does not exist.", 404));
        }
        res.status(200).send({
          data: {
            movie: OutputFormatter.formatMovie(movie),
          },
        });
      })
      .catch((err) => {
        Logger.error(err);
        res.status(500).send({
          message: "An error occurred retrieving movie with id:" + movieId,
        });
      });
  }

  /**
   * @route     GET /api/v1/movies/:movieId/characters
   * @access    Public
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * For API Documentation
   * @api {get} /api/v1/movies/:movieId/characters Get Single Movie Characters
   * @apiVersion 1.0.0
   * @apiName Get Single Movie Characters
   * @apiGroup Movie
   *
   * @apiDescription Get single movie characters
   *
   * @apiParam (Url Parameters) {String} movieId Movie unique ID.
   * @apiParam (Query Parameters) {string="name","gender","height"} sortKey
   * @apiParam (Query Parameters) {string="asc","desc"} sortValue
   * @apiParam (Query Parameters) {string="male","female"} gender
   *
   * @apiSuccessExample {json} Success-Response Example:
   *  HTTP/1.1 200 OK
   *   {
   *    "data": {
   *        "_matches": 2,
   *        "_totalHeight": {
   *            "cm": 315,
   *            "feet": 10.334645669291339
   *        },
   *        "characters": [
   *            {
   *                "id": 2,
   *                "name": "Leia Organa",
   *                "heightMetric": 150,
   *                "heightImperial": 4.9215,
   *                "weight": 49,
   *                "hairColor": "brown",
   *                "skinColor": "light",
   *                "eyeColor": "brown",
   *                "gender": "female",
   *                "birthYear": "19BBY"
   *            },
   *            {
   *                "id": 3,
   *                "name": "Beru Whitesun lars",
   *                "heightMetric": 165,
   *                "heightImperial": 5.41365,
   *                "weight": 75,
   *                "hairColor": "brown",
   *                "skinColor": "light",
   *                "eyeColor": "blue",
   *                "gender": "female",
   *                "birthYear": "47BBY"
   *            }
   *        ]
   *    }
   *}
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "message": "Error Message"
   *     }
   * 
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 500 Server Error
   *     {
   *       "message": "Error Message"
   *     }
   */

  static async getSingleMovieCharacters(req, res, next) {
    const { movieId } = req.params;
    const { sortKey = "name", sortValue = "ASC", gender } = req.query;
    const order = [{ model: Character, as: "characters" }, sortKey, sortValue];
    let whereStatements = {};
    if (gender) {
      whereStatements.gender = gender;
    }

    Movie.findByPk(movieId, {
      separate: true,
      include: [
        {
          model: Character,
          as: "characters",
          where: whereStatements,
          order: order,
        },
      ],
    })
      .then((movie) => {
        if (!movie) {
          return next(new ErrorHandler("Movie does not exist.", 404));
        }
        res.status(200).send({
          data: {
            _matches: movie.characters.length,
            _totalHeight: {
              cm: movie.characters.reduce(function (accumulator, item) {
                return accumulator + item.height;
              }, 0),
              feet:
                movie.characters.reduce(function (accumulator, item) {
                  return accumulator + item.height;
                }, 0) / 30.48,
            },
            characters: movie.characters.map((x) =>
              OutputFormatter.formatCharacter(x)
            ),
          },
        });
      })
      .catch((err) => {
        Logger.error(err);
        res.status(500).send({
          message: "An error occurred retrieving movie with id:" + movieId,
        });
      });
  }

  /**
   * @route     GET /api/v1/movies/:movieId/comments
   * @access    Public
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * For API Documentation
   * @api {get} /api/v1/movies/:movieId/comments Get Single Movie Comments
   * @apiVersion 1.0.0
   * @apiName Get Single Movie Comments
   * @apiGroup Movie
   *
   * @apiDescription Get single movie comments
   *
   * @apiParam (Url Parameters) {String} movieId Movie unique ID.
   *
   * @apiSuccessExample {json} Success-Response Example:
   *  HTTP/1.1 200 OK
   *   {
   *    "data": {
   *        "comments": [
   *            {
   *                "id": 1,
   *                "comment": "duced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
   *                "movieId": 1,
   *                "ipAddress": "::1",
   *                "createdAt": "2021-09-25T10:08:06.000Z",
   *                "updatedAt": "2021-09-25T10:08:06.000Z"
   *            }
   *        ]
   *    }
   *}
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "message": "Error Message"
   *     }
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 500 Server Error
   *     {
   *       "message": "Error Message"
   *     }
   */
  static async getSingleMovieComments(req, res, next) {
    const { movieId } = req.params;
    Comment.findAll({
      where: {
        movieId: movieId,
      },
      order: [["createdAt", "ASC"]],
    })
      .then((comments) => {
        res.status(200).send({
          data: {
            comments: comments,
          },
        });
      })
      .catch((err) => {
        Logger.error(err);
        res.status(500).send({
          message:
            "An error occurred retrieving comments for movie with id:" +
            movieId,
        });
      });
  }

  /**
   * @route     POST /api/v1/movies/:movieId/comments
   * @access    Public
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * For API Documentation
   * @api {post} /api/v1/movies/:movieId/comments Add Comments To A Movie
   * @apiVersion 1.0.0
   * @apiName Add Comments To A Movie
   * @apiGroup Movie
   *
   * @apiDescription Add comments to a movie
   *
   * @apiParam (Url Parameters) {String} movieId Movie unique ID.
   * @apiBody {String} comment
   *
   * @apiSuccessExample {json} Success-Response Example:
   *  HTTP/1.1 201 Created
   *   {
   *    "data": {
   *        "comment": {
   *            "id": 1,
   *            "comment": "duced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
   *            "movieId": "1",
   *            "ipAddress": "::1",
   *            "updatedAt": "2021-09-25T10:08:06.947Z",
   *            "createdAt": "2021-09-25T10:08:06.947Z"
   *        }
   *    }
   *}
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "message": "Error Message"
   *     }
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 500 Server Error
   *     {
   *       "message": "Error Message"
   *     }
   */
  static async addMovieComments(req, res, next) {
    const { movieId } = req.params;
    const { comment } = req.body;
    const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

    if (comment.length > 500) {
      return next(
        new ErrorHandler(
          "Comment is too long. Please reduce to less than 500 characters",
          400
        )
      );
    }

    Movie.findByPk(movieId)
      .then((movie) => {
        if (!movie) {
          return next(new ErrorHandler("Movie does not exist.", 404));
        }
        Comment.create({
          comment: comment,
          movieId: movieId,
          ipAddress: ip,
        })
          .then((comment) => {
            res.status(201).send({
              data: {
                comment: comment,
              },
            });
          })
          .catch((err) => {
            Logger.error(err);
            res.status(500).send({
              message: "An error occurred add the comment",
            });
          });
      })
      .catch((err) => {
        Logger.error(err);
        res.status(500).send({
          message: "An error occurred retrieving movie with id:" + movieId,
        });
      });
  }
}

module.exports = MovieCtrl;
