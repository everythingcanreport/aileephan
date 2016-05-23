var requestify = require('requestify');
module.exports = {
    Login: function(req, res) {
        console.log('on OAuth', req.cookies);
        if (!_.isEmpty(req) &&
            !_.isEmpty(req.cookies) &&
            HelperService.CheckExistData(req.cookies.accessToken)) {
            var isAdmin = false;
            var urlGetUserAccount = sails.config.aileeConfig.urlGetUserAccount + req.cookies.accessToken;
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
                    res.ok({ data: UserMenuService(isAdmin) });
                }, function(err) {
                    res.forbidden(err);
                });
            }, function(err) {
                res.forbidden(err);
            });
        }
    }
}
