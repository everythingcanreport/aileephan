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

                    function getCookie(cname) {
                        var name = cname + "=";
                        var ca = document.cookie.split(';');
                        for (var i = 0; i < ca.length; i++) {
                            var c = ca[i];
                            while (c.charAt(0) == ' ') {
                                c = c.substring(1);
                            }
                            if (c.indexOf(name) == 0) {
                                return c.substring(name.length, c.length);
                            }
                        }
                        return "";
                    };
                    alert('cookieProfile'+ getCookie('cookieProfile'));
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
