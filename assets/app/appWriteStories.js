requirejs.config({
    baseUrl: window.location.origin + '/libs',
    paths: {
        app: '../working/write'
    }
});
requirejs(['jquery.min'], function($) {
    requirejs(['semantic.min', '/libs/tinymce/tinymce.min.js'], function(semantic, tinymce) {
        requirejs(['app/main']);
    });
});
