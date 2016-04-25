define(['./getFbUserProfile', './getFbAvatar', './getMenu'], function(getFbUserProfile, getFbAvatar, getMenu) {
    return function(response) {
        if (typeof response === 'object' &&
            response.status === 'connected' &&
            typeof response.authResponse === 'object' &&
            response.authResponse.userID) {
            //get user profile
            var urlPicture = '/' + response.authResponse.userID + '/picture';
            Promise.all([getFbUserProfile(), getFbAvatar(urlPicture), getMenu(response)])
                .then(function(successAll) {
                    $('.connected-menu').empty();
                    successAll[2].data.forEach(function(menu, index) {
                        $('.connected-menu').append('<a class="item" onClick="' + menu.func + '"><i class="' + menu.icon + ' icon"></i>' + menu.Name + '</a>');
                    });
                    $('.loader').removeClass('active');
                    $('.connected').removeClass('hide');
                    $('.unknown').addClass('hide');
                }, function(err) {
                    console.log('OAuth failed', err);
                });
        } else {
            //show button login
            $('.loader').removeClass('active');
            $('.connected').addClass('hide');
            $('.unknown').removeClass('hide');
        }
    };
});
