requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/write'
    }
});
requirejs(['lodash.min', 'jquery.min'], function(_, $) {
    requirejs(['app/main']);
});
