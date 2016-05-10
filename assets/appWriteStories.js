requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/write'
    }
});
requirejs(['lodash.min', 'jquery', '/libs/noty/js/noty/packaged/jquery.noty.packaged.min.js'], function(_, $, noty) {
    requirejs(['app/main']);
});
