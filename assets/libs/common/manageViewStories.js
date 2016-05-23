define(function() {
    return function(uid) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'GET',
                url: "http://aileephan.com/admin/view/" + uid,
                // url: "http://localhost:1337/admin/view/" + uid,
                success: function(response) {
                    resolve(response);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
        return p;
    };
});
