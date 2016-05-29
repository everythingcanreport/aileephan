define(function() {
    return function(response) {
    	console.log('call api login facebook');
        FB.getLoginStatus(function(response) {});
    };
});
