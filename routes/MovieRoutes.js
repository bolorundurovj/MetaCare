const { MovieCtrl } = require('../controllers');

class MovieRoutes {
  static route(router) {
    router
      .route('/movies')
      .post(
        MovieCtrl.create
      );

    router
      .route('/movies/:movieId')
      .get(MovieCtrl.getSingleMovie)
  }
}

module.exports = MovieRoutes;
