module.exports = function(req, res, next) {
    var requestify = require('requestify');
    if (!_.isEmpty(req) &&
        !_.isEmpty(req.cookies) &&
        HelperService.CheckExistData(req.session.name)) {
        next();
    } else {
        res.forbidden('not.permission');
    }
};
