define(function() {
    return function() {
        var p = new Promise(function(resolve, reject) {
            FB.api('/me', function(userProfile) {
                if (typeof userProfile === 'object' &&
                    !userProfile.error) {
                    $('.connected-name span').text(userProfile.name);
                    resolve({ status: 'success' });
                } else {
                    reject({ status: 'error' });
                }
            });
        });
        return p;
    };
});
