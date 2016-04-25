requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/manage'
    }
});
requirejs(['lodash.min', 'jquery.min'], function(_, $) {
    requirejs(['app/main']);
});
