requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/home',
    }
});
requirejs(['jquery.min'], function($) {
    requirejs(['app/main']);
});
