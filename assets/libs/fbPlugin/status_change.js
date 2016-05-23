define(['./getFbUserProfile', './getFbAvatar', './getMenu'], function(getFbUserProfile, getFbAvatar, getMenu) {
    return function(response) {
        if (typeof response === 'object' &&
            response.status === 'connected' &&
            typeof response.authResponse === 'object' &&
            response.authResponse.userID) {
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
                    localStorage.setItem('localStorageMenu', JSON.stringify(successAll[2].data));
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
