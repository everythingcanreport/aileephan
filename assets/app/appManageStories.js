requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/manage'
    }
});
requirejs(['jquery.min'],
    function($, noty) {
        requirejs(['semantic.min'], function(semantic) {
            requirejs(['app/main']);
        });
    });
