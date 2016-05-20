define(function() {
    return function(response) {
        //remove localStorage
        localStorage.removeItem('localStorageAvatar');
        localStorage.removeItem('localStorageMenu');
        localStorage.removeItem('localStorageProfile');
        //remove cookies
        console.log('xoa cookies');
        document.cookie = 'accessToken=';
        console.log('cookies after deleted', document.cookie);
    };
});
