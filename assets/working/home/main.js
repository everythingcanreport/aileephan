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
                response.status === 'connected') {
                //set cookiesAccessToken
                document.cookie = 'accessToken=' + response.authResponse.accessToken;
            } else {
                $('.menu-loader').removeClass('active');
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
        js.src = "//connect.facebook.net/vi_VN/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    //end facebook plugin
    var dateWriteReview = new Date();
    var dateWriteResponse = $('.home-date-hidden').val();
    if (dateWriteResponse) {
        dateWriteReview = new Date(dateWriteResponse);
    }
    var d = dateWriteReview.getDate() <= 9 ? '0' + dateWriteReview.getDate() : dateWriteReview.getDate();
    var m = (dateWriteReview.getMonth() + 1) <= 9 ? ('0' + (dateWriteReview.getMonth() + 1)) : dateWriteReview.getMonth() + 1;
    var y = dateWriteReview.getFullYear();
    var dateWriteReviewShow = d + '/' + m + '/' + y;
    $('.home-date').text('');
    $('.home-date').append(dateWriteReviewShow);
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

var rows = 5;
var count = $('.home-count').val();
var appending = false;
//load data when scroll last page
$(document).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        if (rows < count && !appending) {
            appending = true;
            require(['common/listStories'], function(listStories) {
                var dataFilter = {
                    Limit: 5,
                    Offset: rows
                };
                $('.home-loader').addClass('active');
                listStories(dataFilter)
                    .then(function(response) {
                        $('.home-loader').removeClass('active');
                        renderData(response);
                    }, function(err) {
                        $('.home-loader').removeClass('active');
                    });
            });
        }
    }
});

//render data
function renderData(response) {
    if (response && response.rows) {
        response.rows.forEach(function(stories, index) {
            var dateCreate = new Date(stories.CreatedDate);
            var d = dateCreate.getDate() <= 9 ? '0' + dateCreate.getDate() : dateCreate.getDate();
            var m = (dateCreate.getMonth() + 1) <= 9 ? ('0' + (dateCreate.getMonth() + 1)) : dateCreate.getMonth() + 1;
            var y = dateCreate.getFullYear();
            var dateCreateShow = d + '/' + m + '/' + y;
            var ribbon = '<a class="ui pink font-ribbon ribbon large label">Ngôn tình</a>';
            var homeDate = '<span class="float-right media-time font-ribbon home-date">' +
                dateCreateShow + '</span>';
            var uidBackground = (stories &&
                stories.FileUploads &&
                stories.FileUploads[0]) ? stories.FileUploads[0].UID : null;
            var imageBackground = uidBackground ? '<div class="ui small image">' +
                '<a href="/truyen/' + stories.SpeakingUrl + '" class="ui image">' +
                '<img class="height-image-home" src="/user/download-background/' +
                uidBackground + '"/></a></div>' : '';
            var title = (stories &&
                    stories.Title &&
                    stories.Title &&
                    stories.Title.length !== 0) ? '<h1 class="ui pink header">' +
                '<div class="content">' +
                '<span class="font-header capitalize"><a href="/truyen/' + stories.SpeakingUrl +
                '">' +
                stories.Title +
                '</a></span></div></h1>' : '';
            var content = ''
            var detail = '<div class="description"><p class="font-content">' +
                stories.ShortContent +
                '</p><a href="/truyen/' +
                stories.SpeakingUrl +
                '"class = "ui mini pink button font-button">Chi tiết</a></div>';
            $('.home-main').append('<div class="ui segment">' +
                ribbon + homeDate + '<div class="ui very relaxed items"><div class="item">' +
                imageBackground + '<div class="content">' + title + detail +
                '</div></div></div></div>');
        });
        appending = false;
        rows += response.rows.length;
    }
};
