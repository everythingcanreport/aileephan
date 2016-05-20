define(function() {
    return function(response) {
        //remove localStorage
        console.log('call event logout event');
        localStorage.removeItem('localStorageAvatar');
        localStorage.removeItem('localStorageMenu');
        localStorage.removeItem('localStorageProfile');
        //remove cookies
        document.cookie = 'accessToken=;';
    };
});
