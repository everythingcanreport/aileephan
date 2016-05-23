define(function() {
    return function(dataCreate) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: "http://aileephan.com/admin/create",
                // url: "http://localhost:1337/admin/create",
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
