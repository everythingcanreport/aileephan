module.exports = function(req, res, next) {
    var requestify = require('requestify');
    if (!_.isEmpty(req) &&
        !_.isEmpty(req.cookies) &&
        HelperService.CheckExistData(req.cookies.accessToken)) {
        var accessToken = req.cookies.accessToken;
        var isAdmin = false;
        var urlGetUserAccount = sails.config.aileeConfig.urlGetUserAccount + accessToken;
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
                    var error = new Error('not.permission');
                    res.forbidden(error);
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
