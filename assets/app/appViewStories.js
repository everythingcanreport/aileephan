requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/view'
    }
});
requirejs(['jquery.min'], function($) {
    requirejs(['app/main']);
});
