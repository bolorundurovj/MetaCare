const { CharacterCtrl } = require('../controllers');

class CharacterRoutes {
  static route(router) {
    router
      .route('/characters')
      .get(CharacterCtrl.getAllCharacters);

    router
      .route('/characters/:characterId')
      .get(CharacterCtrl.getSingleCharacter)
  }
}

module.exports = CharacterRoutes;
