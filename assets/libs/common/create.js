define(function() {
    return function(dataCreate, accessToken) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: "http://aileephan.com:1337/admin/create",
                beforeSend: function(request) {
                    request.setRequestHeader("accessTokenFB", accessToken);
                },
                data: {
                    data: dataCreate
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
