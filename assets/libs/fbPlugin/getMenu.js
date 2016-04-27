define(function() {
    return function(responseStatusLogin) {
        var p = new Promise(function(resole, reject) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:1337/dang-nhap?access_token=' + responseStatusLogin.authResponse.accessToken,
                success: resole,
                error: reject
            });
        });
        return p;
    };
});
