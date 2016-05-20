define(function() {
    return function(response) {
        //remove localStorage
        localStorage.removeItem('localStorageAvatar');
        localStorage.removeItem('localStorageMenu');
        localStorage.removeItem('localStorageProfile');
        //remove cookies
        document.cookie = 'accessToken=;' + 'expires=' + new Date()+'; path=/';
    };
});
