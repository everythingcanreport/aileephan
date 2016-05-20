define(function() {
    return function(dataUpdate) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: "http://aileephan.com/admin/update",
                data: {
                    data: dataUpdate
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
