define(function() {
    return function(dataUpload) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:1337/truyen/viet-truyen/upload-background',
                data: dataUpload,
                contentType: false,
                processData: false,
                success: function(response) {
                    resolve(response)
                    // var fileName = null;
                    // var ext = response.fileName.split('.')[response.fileName.split('.').length - 1];
                    // var fileName = response.fileName.length >= 10 ? response.fileName.substring(0, 10) + '...' + ext : response.fileName;
                    // $('.title-background span').text(fileName);
                    // $('.background-loader').removeClass('active');
                },
                error: function(err) {
                    // console.log('response error', err);
                    reject(err);
                }
            });
        });
        return p;
    }
});
