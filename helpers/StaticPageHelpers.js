const path = require('path');

class StaticPageHelpers {
  static getDocumentation() {
    return path.join(path.dirname(__dirname), 'static', 'docs', 'index.html');
  }
}

module.exports = StaticPageHelpers;
