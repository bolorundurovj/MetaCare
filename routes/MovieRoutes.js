const { MovieCtrl } = require("../controllers");
const MovieValidators = require("../validators/MovieValidator");

class MovieRoutes {
  static route(router) {
    router.route("/movies").get(MovieCtrl.getAllMovies);

    router.route("/movies/:movieId").get(MovieCtrl.getSingleMovie);

    router
      .route("/movies/:movieId/characters")
      .get(
        MovieValidators.validateGetMovieCharacters,
        MovieCtrl.getSingleMovieCharacters
      );

    router
      .route("/movies/:movieId/comments")
      .get(MovieCtrl.getSingleMovieComments)
      .post(MovieValidators.validateCreateComment, MovieCtrl.addMovieComments);
  }
}

module.exports = MovieRoutes;
