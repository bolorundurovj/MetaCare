const CharacterRoutes = require('./CharacterRoutes');
const MovieRoutes = require('./MovieRoutes');
const StaticRoutes = require('./StaticRoutes');

class Routes {
  static route(router) {
    CharacterRoutes.route(router)
    MovieRoutes.route(router);
    StaticRoutes.route(router);
    return router;
  }
}

module.exports = Routes;
