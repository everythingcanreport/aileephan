module.exports = function(req, res, next) {
    var requestify = require('requestify');
    if (!_.isEmpty(req) &&
        !_.isEmpty(req.cookies) &&
        HelperService.CheckExistData(req.session.userID)) {
        console.log('policies.......', req.session.userID)
        req.user = { id: req.session.userID };
        next();
    } else {
        res.forbidden('not.permission');
    }
};
