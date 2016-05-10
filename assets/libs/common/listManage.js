define(function() {
    return function(dataFilter) {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: "http://localhost:1337/truyen/quan-li-truyen",
                data: dataFilter,
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
