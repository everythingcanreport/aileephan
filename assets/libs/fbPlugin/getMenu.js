define(function() {
    return function(responseStatusLogin) {
        var p = new Promise(function(resole, reject) {
            $.ajax({
                type: 'GET',
                url: 'http://aileephan.com/fb/login',
                success: resole,
                error: reject
            });
        });
        return p;
    };
});
