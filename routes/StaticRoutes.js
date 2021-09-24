const { DocCtrl } = require('../controllers');

class StaticRoutes {
  static route(router) {
    router
      .route('/docs')
      .get(DocCtrl.getDocumentation);

    return router;
  }
}

module.exports = StaticRoutes;
