const StaticPageHelper = require('../helpers/StaticPageHelpers')

class DocCtrl {
static async getDocumentation(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(StaticPageHelper.getDocumentation());
  }
}

module.exports = DocCtrl;