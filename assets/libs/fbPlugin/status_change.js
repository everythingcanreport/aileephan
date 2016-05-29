define(['./getFbUserProfile', './getFbAvatar', './getMenu'], function(getFbUserProfile, getFbAvatar, getMenu) {
    return function(response) {
        if (typeof response === 'object' &&
            response.status === 'connected' &&
            typeof response.authResponse === 'object' &&
            response.authResponse.userID) {
            //funcion setCookie - getCookie
            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            }
            //set cookiesAccessToken
            var nowC = new Date();
            var timeC = nowC.getTime();
            timeC += response.authResponse.expiresIn * 1000;
            nowC.setTime(timeC);
            document.cookie = 'accessToken=' + response.authResponse.accessToken + '; expires=' + nowC.toUTCString() + '; path=/';
            //get user profile
            var urlPicture = '/' + response.authResponse.userID + '/picture';
            Promise.all([getFbUserProfile(), getFbAvatar(urlPicture), getMenu(response)])
                .then(function(successAll) {
                    setCookie('cookieMenu', JSON.stringify(successAll[2].data), 1);

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
                    alert('cookieMenu'+getCookie('cookieMenu'));
                    $('.connected-menu').empty();
                    successAll[2].data.forEach(function(menu, index) {
                        $('.connected-menu').append('<a class="item" onClick="' + menu.func + '"><i class="' + menu.icon + ' icon"></i>' + menu.Name + '</a>');
                    });
                    $('.menu-loader').removeClass('active');
                    $('.connected').removeClass('hide');
                    $('.unknown').addClass('hide');
                }, function(err) {
                    noty({
                        text: 'Authentication failed!',
                        layout: 'topRight',
                        type: 'error',
                        timeout: 3000
                    });
                });
        } else {
            //show button login
            $('.menu-loader').removeClass('active');
            $('.connected').addClass('hide');
            $('.unknown').removeClass('hide');
        }
    };
});
