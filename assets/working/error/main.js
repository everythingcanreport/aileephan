//dropdown menu
$('.connected').dropdown();
//function get cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
//check cookieAvatar - cookieProfile
var cookieAvatar = getCookie('cookieAvatar');
var cookieProfile = getCookie('cookieProfile');
if (cookieAvatar &&
    cookieProfile) {
    cookieAvatar = JSON.parse(cookieAvatar);
    cookieProfile = JSON.parse(cookieProfile);
    var lastName = '';
    if (cookieProfile.name) {
        lastName = cookieProfile.name.split(' ')[cookieProfile.name.split(' ').length - 1];
    }
    $('.connected-name').text(lastName);
    $('.connected-avatar').attr('src', cookieAvatar.url);
    $('.loader').removeClass('active');
    $('.connected').removeClass('hide');
    $('.unknown').addClass('hide');
}
//end

//check cookieMenu
var cookieMenu = getCookie('cookieMenu');
if (cookieMenu) {
    cookieMenu = JSON.parse(cookieMenu);
    //render menu
    $('.connected-menu').empty();
    var menus = null;
    if (cookieMenu.isAdmin) {
        menus = [
            { Name: 'Thêm mới truyện', icon: 'write', func: 'writeStories();' },
            { Name: 'Quản lí truyện', icon: 'book', func: 'manageStories();' },
            { Name: 'Thoát', icon: 'key', func: 'FB.logout();' }
        ];
    } else {
        menus = [
            { Name: 'Thoát', icon: 'key', func: 'FB.logout()' }
        ];
    }
    menus.forEach(function(menu, index) {
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
