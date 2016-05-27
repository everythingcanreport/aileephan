define(function() {
    return function(urlAvatar) {
        var p = new Promise(function(resolve, reject) {
            FB.api(urlAvatar, function(response) {
                if (typeof response === 'object' &&
                    !response.error &&
                    typeof response.data === 'object') {
                    //set localStorageAvatar
                    window.localStorage.setItem('localStorageAvatar', JSON.stringify(response.data));
                    $('.connected-avatar').attr('src', response.data.url);
                    resolve({ status: 'success' });
                } else {
                    reject({ status: 'error' });
                }
            });
        });
        return p;
    };
});
