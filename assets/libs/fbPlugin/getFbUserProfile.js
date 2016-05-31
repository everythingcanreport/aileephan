define(function() {
    return function() {
        var p = new Promise(function(resolve, reject) {
            FB.api('/me', function(userProfile) {
                if (typeof userProfile === 'object' &&
                    !userProfile.error) {
                    //funcion setCookie
                    function setCookie(cname, cvalue, exdays) {
                        var d = new Date();
                        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                        var expires = "expires=" + d.toUTCString();
                        document.cookie = cname + "=" + cvalue + "; " + expires;
                    }
                    //end
                    setCookie('cookieProfile', JSON.stringify(userProfile), 1);
                    if (userProfile.name) {
                        $('.connected-name').text(userProfile.name);
                    }
                    resolve({ status: 'success' });
                } else {
                    reject({ status: 'error' });
                }
            });
        });
        return p;
    };
});
