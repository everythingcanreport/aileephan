define(function() {
    return function(response) {
        //remove localStorage
        localStorage.removeItem('localStorageAvatar');
        localStorage.removeItem('localStorageMenu');
        localStorage.removeItem('localStorageProfile');
        //remove cookies
        document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
        //go home if not writing
        if (window &&
            window.location &&
            window.location.pathname &&
            window.location.pathname.indexOf('/admin/write') === -1 &&
            window.location.pathname !== '/') {
            window.location.href = window.location.origin;
        }
    };
});
