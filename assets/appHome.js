requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/home',
        moment: './moment/moment'
    }
});
requirejs(['lodash.min',
    'jquery.min',
    '/libs/noty/js/noty/packaged/jquery.noty.packaged.min.js'
], function(_, $, noty) {
    requirejs(['app/main']);
});
