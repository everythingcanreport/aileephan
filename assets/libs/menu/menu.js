define(function() {
    return {
        writeStories: function(uid) {
            if (!_.isNull(uid) &&
                !_.isUndefined(uid)) {
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
