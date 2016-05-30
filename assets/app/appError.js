requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/error',
    }
});
requirejs(['jquery.min'], function($) {
    requirejs(['semantic.min'], function(semantic) {
        requirejs(['app/main']);
    });
});
