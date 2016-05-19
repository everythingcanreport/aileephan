define(function() {
    return function(dataFilter, accessToken) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: "http://aileephan.com/admin/manage",
                data: dataFilter,
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
