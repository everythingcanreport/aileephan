requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/write'
    }
});
requirejs(['jquery.min',
    '/libs/noty/js/noty/packaged/jquery.noty.packaged.min.js',
], function($, noty) {
    requirejs(['semantic.min'], function(semantic) {
        requirejs(['app/main']);
    });
});
