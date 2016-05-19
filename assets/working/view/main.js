define(function(require) {
    //facebook plugin
    var fbInit = require('fbPlugin/init');
    var login_event = require('fbPlugin/login_event');
    var logout_event = require('fbPlugin/logout_event');
    var status_change = require('fbPlugin/status_change');
    window.fbAsyncInit = function() {
        fbInit();
        FB.getLoginStatus(function(response) {
            if (typeof response === 'object' &&
                response.status === 'connected') {}
        });
        FB.Event.subscribe('auth.login', login_event);
        FB.Event.subscribe('auth.logout', logout_event);
        FB.Event.subscribe('auth.statusChange', status_change);
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.6&appId=1032633966817570";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    //end facebook plugin
    require(['/libs/moment-timezone/moment-timezone.js'], function(moment) {
        var dateWriteReview = moment().format('DD/MM/YYYY');
        var dateWriteResponse = $('.view-date-create').val();
        if (!_.isNull(dateWriteResponse) &&
            !_.isUndefined(dateWriteResponse)) {
            dateWriteReview = moment(dateWriteResponse, 'ddd MMM DD YYYY HH:mm:ss ZZ').format('DD/MM/YYYY');
        }
        $('.review-date').text('');
        $('.review-date').append(dateWriteReview);
    });
});

function writeStories() {
    require(['menu/menu'], function(menu) {
        menu.writeStories();
    });
};

function manageStories() {
    require(['menu/menu'], function(menu) {
        menu.manageStories();
    });
};