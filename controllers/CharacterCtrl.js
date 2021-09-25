const Logger = require("../config/logger");
const { ErrorHandler } = require("../helpers/ErrorHelper");
const OutputFormatter = require("../helpers/OutputFormatterHelper");
const { Movie, Character } = require("../models");

class CharacterCtrl {
  /**
   * @route     GET /api/v1/characters
   * @access    Public
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * For API Documentation
   * @api {get} /api/v1/characters Get All Characters
   * @apiVersion 1.0.0
   * @apiName Get All Characters
   * @apiGroup Character
   *
   * @apiDescription Get all characters
   *
   * @apiSuccessExample {json} Success-Response Example:
   *  HTTP/1.1 200 OK
   *{
   * "data": {
   *     "_matches": 32,
   *     "_totalHeight": {
   *         "cm": 5308,
   *         "feet": 174.14698162729658
   *     },
   *     "characters": [
   *         {
   *             "id": 5,
   *             "name": "Leia Organa",
   *             "heightMetric": 150,
   *             "heightImperial": 4.9215,
   *             "weight": 49,
   *             "hairColor": "brown",
   *             "skinColor": "light",
   *             "eyeColor": "brown",
   *             "gender": "female",
   *             "birthYear": "19BBY"
   *         },
   *         {
   *             "id": 9,
   *             "name": "Beru Whitesun lars",
   *             "heightMetric": 165,
   *             "heightImperial": 5.41365,
   *             "weight": 75,
   *             "hairColor": "brown",
   *             "skinColor": "light",
   *             "eyeColor": "blue",
   *             "gender": "female",
   *             "birthYear": "47BBY"
   *         },
   *     ]
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
  static async getAllCharacters(req, res, next) {
    const { sortKey = "name", sortValue = "ASC", gender } = req.query;
    const order = [sortKey, sortValue];
    let whereStatements = {};
    if (gender) {
      whereStatements.gender = gender;
    }
    Character.findAll({
      where: whereStatements,
      order: [order],
      include: [
        {
          model: Movie,
          as: "movies",
        },
      ],
    })
      .then((characters) => {
        res.status(200).send({
          data: {
            _matches: characters.length,
            _totalHeight: {
              cm: characters.reduce(function (accumulator, item) {
                return accumulator + item.height;
              }, 0),
              feet:
                characters.reduce(function (accumulator, item) {
                  return accumulator + item.height;
                }, 0) / 30.48,
            },
            characters: characters.map((x) =>
              OutputFormatter.formatCharacter(x)
            ),
          },
        });
      })
      .catch((err) => {
        Logger.error(err);
        res.status(500).send({
          message: "An error occurred retrieving characters",
        });
      });
  }

  /**
   * @route     GET /api/v1/characters/:characterId
   * @access    Public
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * For API Documentation
   * @api {get} /api/v1/characters/:characterId Get Single Character
   * @apiVersion 1.0.0
   * @apiName Get Single Character
   * @apiGroup Character
   *
   * @apiDescription Get single character details
   *
   * @apiParam (Url Parameters) {String} characterId Character unique ID.
   *
   * @apiSuccessExample {json} Success-Response Example:
   *  HTTP/1.1 200 OK
   *   {
   *    "data": {
   *        "character": {
   *            "id": 1,
   *            "name": "Luke Skywalker",
   *            "heightMetric": 172,
   *            "heightImperial": 5.64332,
   *            "weight": 77,
   *            "hairColor": "blond",
   *            "skinColor": "fair",
   *            "eyeColor": "blue",
   *            "gender": "male",
   *            "birthYear": "19BBY"
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
  static async getSingleCharacter(req, res, next) {
    const { characterId } = req.params;

    Character.findByPk(characterId, {
      include: [
        {
          model: Movie,
          as: "movies",
        },
      ],
    })
      .then((character) => {
        if (!character) {
          return next(new ErrorHandler("Character does not exist.", 404));
        }
        res.status(200).send({
          data: {
            character: OutputFormatter.formatCharacter(character),
          },
        });
      })
      .catch((err) => {
        Logger.error(err);
        res.status(500).send({
          message:
            "An error occurred retrieving character with id:" + characterId,
        });
      });
  }
}

module.exports = CharacterCtrl;
