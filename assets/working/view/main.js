//check localStorageAvatar - localStorageProfile
var localStorageAvatar = localStorage.getItem('localStorageAvatar');
var localStorageProfile = localStorage.getItem('localStorageProfile');
if (localStorageAvatar &&
    localStorageProfile) {
    localStorageAvatar = JSON.parse(localStorageAvatar);
    localStorageProfile = JSON.parse(localStorageProfile);
    $('.connected-name span').text(localStorageProfile.name);
    $('.connected-avatar').attr('src', localStorageAvatar.url);
    $('.loader').removeClass('active');
    $('.connected').removeClass('hide');
    $('.unknown').addClass('hide');
}
//end

//check localStorageMenu
var localStorageMenu = localStorage.getItem('localStorageMenu');
if (localStorageMenu) {
    localStorageMenu = JSON.parse(localStorageMenu);
    //render menu
    $('.connected-menu').empty();
    localStorageMenu.forEach(function(menu, index) {
        $('.connected-menu').append('<a class="item" onClick="' + menu.func + '"><i class="' + menu.icon + ' icon"></i>' + menu.Name + '</a>');
    });
    $('.loader').removeClass('active');
    $('.connected').removeClass('hide');
    $('.unknown').addClass('hide');
}
//end
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
                response.status === 'connected') {} else {
                $('.menu-loader').removeClass('active');
                $('.connected').addClass('hide');
                $('.unknown').removeClass('hide');
            }
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
    var dateWriteReview = new Date();
    var dateWriteResponse = $('.view-date-create').val();
    if (dateWriteResponse) {
        dateWriteReview = new Date(dateWriteResponse);
    }
    var d = dateWriteReview.getDate() <= 9 ? '0' + dateWriteReview.getDate() : dateWriteReview.getDate();
    var m = (dateWriteReview.getMonth() + 1) <= 9 ? ('0' + (dateWriteReview.getMonth() + 1)) : dateWriteReview.getMonth() + 1;
    var y = dateWriteReview.getFullYear();
    var dateWriteReviewShow = d + '/' + m + '/' + y;
    $('.review-date').text('');
    $('.review-date').append(dateWriteReviewShow);
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
