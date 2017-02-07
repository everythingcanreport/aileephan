module.exports = function(req, res, next) {
  console.log("req.cookies", req.cookies)
  console.log("req.session", req.session)
//     var requestify = require('requestify');
//     if (!_.isEmpty(req) &&
//         !_.isEmpty(req.cookies) &&
//         HelperService.CheckExistData(req.session.userID)) {
//         req.user = { id: req.session.userID };
//         next();
//     } else {
//         res.forbidden('not.permission');
//     }
  next();
};
