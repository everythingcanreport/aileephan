define(function() {
    return {
        writeStories: function(uid) {
            if (uid) {
                window.location.href = window.location.origin + '/admin/write/' + uid;
            } else {
                window.location.href = window.location.origin + '/admin/write';
            }
        },
        manageStories: function() {
            window.location.href = window.location.origin + '/admin/manage';
        }
    }
});
