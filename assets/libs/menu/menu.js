define(function() {
    return {
        writeStories: function() {
            window.location.href = window.location.origin + '/stories/write';
        },
        manageStories: function() {
            window.location.href = window.location.origin + '/stories/manage';
        },
        help: function() {
            window.location.href = window.location.origin + '/help';
        }
    }
});
