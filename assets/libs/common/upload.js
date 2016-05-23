define(function() {
    return function(dataUpload) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: 'http://aileephan.com/admin/write/upload-background',
                // url: 'http://localhost:1337/admin/write/upload-background',
                data: dataUpload,
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
