define(function() {
    return function(uid, accessToken) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'GET',
                url: "http://aileephan.com:1337/admin/view/" + uid,
                beforeSend: function(request) {
                    request.setRequestHeader("accessTokenFB", accessToken);
                },
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
