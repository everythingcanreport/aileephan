define(function() {
    return function(response) {
        //function delete cookie
        function deleteCookie(name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
        }
        //remove cookies
        deleteCookie('cookieAvatar');
        deleteCookie('cookieProfile');
        deleteCookie('cookieMenu');
        $('.connected').dropdown('restore default value');
        //go home if not writing
        if (window &&
            window.location &&
            window.location.pathname &&
            window.location.pathname.indexOf('/admin/write') === -1 &&
            window.location.pathname !== '/') {
            window.location.href = window.location.origin;
        }
    };
});
