module.exports = function(req, res, next) {
    var requestify = require('requestify');
    if (!_.isEmpty(req) &&
        !_.isEmpty(req.headers) &&
        HelperService.CheckExistData(req.headers.accesstokenfb)) {
        var accesstokenfb = req.headers.accesstokenfb;
        var isAdmin = false;
        var urlGetUserAccount = sails.config.aileeConfig.urlGetUserAccount + accesstokenfb;
        requestify.get(urlGetUserAccount).then(function(response) {
            // Get the response body
            var userInfo = response.getBody();
            var urlGetRoleApp = sails.config.aileeConfig.urlGetRoleApp;
            requestify.get(urlGetRoleApp).then(function(responseApp) {
                var appInfo = responseApp.getBody();
                _.forEach(appInfo.data, function(valueApp, indexApp) {
                    if (valueApp.user === userInfo.id &&
                        valueApp.role === 'administrators') {
                        isAdmin = true;
                        return false;
                    }
                });
                if (isAdmin) {
                    req.user = userInfo;
                    next();
                } else {
                    res.forbidden(err);
                }
            }, function(err) {
                res.forbidden(err);
            });
        }, function(err) {
            res.forbidden(err);
        });
    } else {
        res.forbidden('not.permission');
    }
};
