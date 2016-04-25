requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/home'
    }
});
requirejs(['lodash.min', 'jquery.min'], function(_, $) {
    requirejs(['app/main']);
});
