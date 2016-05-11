define(function() {
    return {
        writeStories: function() {
            window.location.href = window.location.origin + '/admin/write';
        },
        manageStories: function() {
            window.location.href = window.location.origin + '/admin/manage';
        }
    }
});
