define(['./getFbUserProfile', './getFbAvatar', './getMenu'], function(getFbUserProfile, getFbAvatar, getMenu) {
    return function(response) {
        console.log('vao change status', response);
        if (typeof response === 'object' &&
            response.status === 'connected' &&
            typeof response.authResponse === 'object' &&
            response.authResponse.userID) {
            console.log('vao set cookies');
            //set cookiesAccessToken
            document.cookie = ("accessToken=" + response.authResponse.accessToken).toString();
            console.log('cookies after set', document.cookie)
            //get user profile
            var urlPicture = '/' + response.authResponse.userID + '/picture';
            Promise.all([getFbUserProfile(), getFbAvatar(urlPicture), getMenu(response)])
                .then(function(successAll) {
                    localStorage.setItem('localStorageMenu', JSON.stringify(successAll[2].data));
                    $('.connected-menu').empty();
                    successAll[2].data.forEach(function(menu, index) {
                        $('.connected-menu').append('<a class="item" onClick="' + menu.func + '"><i class="' + menu.icon + ' icon"></i>' + menu.Name + '</a>');
                    });
                    $('.loader').removeClass('active');
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
            $('.loader').removeClass('active');
            $('.connected').addClass('hide');
            $('.unknown').removeClass('hide');
        }
    };
});
