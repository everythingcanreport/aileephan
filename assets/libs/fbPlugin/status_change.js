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
                    $('.connected-menu').empty();
                    //check role isAdmin
                    var menus = null;
                    if (successAll[2].data &&
                        successAll[2].data.isAdmin) {
                        menus = [
                            { Name: 'Thêm mới', icon: 'write', func: 'writeStories();' },
                            { Name: 'Quản lí', icon: 'book', func: 'manageStories();' },
                            { Name: 'Thoát', icon: 'key', func: 'FB.logout();' }
                        ];
                    } else {
                        menus = [
                            { Name: 'Thoát', icon: 'key', func: 'FB.logout()' }
                        ];
                    }
                    menus.forEach(function(menu, index) {
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
