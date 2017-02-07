module.exports = function(req, res, next) {
  console.log("req.cookies", req.cookies)
  console.log("req.session", req.session.userID)
    var requestify = require('requestify');
    if (!_.isEmpty(req) &&
        req.cookies &&
        HelperService.CheckExistData(req.session.userID)) {
        req.user = { id: req.session.userID };
        next();
    } else {
        res.forbidden('not.permission');
    }
  next();
};
