define(function() {
    return function(dataUpload, accessToken) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: 'http://aileephan.com:1337/admin/write/upload-background',
                data: dataUpload,
                beforeSend: function(request) {
                    request.setRequestHeader("accessTokenFB", accessToken);
                },
                contentType: false,
                processData: false,
                success: function(response) {
                    resolve(response);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
        return p;
    }
});
