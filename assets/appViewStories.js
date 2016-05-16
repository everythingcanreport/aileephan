requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/view',
        moment: './moment/moment'
    }
});
requirejs(['lodash.min', 'jquery.min'], function(_, $) {
    requirejs(['app/main']);
});
