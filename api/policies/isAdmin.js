module.exports = function(req, res, next) {
    var requestify = require('requestify');
    if (!_.isEmpty(req) &&
        !_.isEmpty(req.cookies) &&
        HelperService.CheckExistData(req.session.id)) {
        console.log('policies.......', req.session.id)
        req.user = { id: req.session.id };
        next();
    } else {
        res.forbidden('not.permission');
    }
};
