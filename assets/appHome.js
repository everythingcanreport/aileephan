requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/home',
    }
});
requirejs(['jquery.min',
    '/libs/noty/js/noty/packaged/jquery.noty.packaged.min.js'
], function($, noty) {
    requirejs(['app/main']);
});
