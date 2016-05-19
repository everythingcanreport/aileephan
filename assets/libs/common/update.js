define(function() {
    return function(dataUpdate, accessToken) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: "http://aileephan.com/admin/update",
                data: {
                    data: dataUpdate
                },
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
