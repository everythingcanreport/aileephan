define(function() {
    return function(response) {
        //remove localStorage
        localStorage.removeItem('localStorageFB');
        localStorage.removeItem('localStorageMenu');
    };
});
