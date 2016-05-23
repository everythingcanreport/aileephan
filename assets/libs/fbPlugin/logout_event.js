define(function() {
    return function(response) {
        //remove localStorage
        localStorage.removeItem('localStorageAvatar');
        localStorage.removeItem('localStorageMenu');
        localStorage.removeItem('localStorageProfile');
        //remove cookies
        document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
    };
});
