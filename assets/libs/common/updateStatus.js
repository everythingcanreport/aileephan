define(function() {
    return function(dataUpdate) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: "http://aileephan.com/admin/update-status",
                // url: "http://localhost:1337/admin/update-status",
                data: dataUpdate,
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
