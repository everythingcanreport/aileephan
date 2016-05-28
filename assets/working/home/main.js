//check localStorageAvatar - localStorageProfile
var localStorageAvatar = window.localStorage.getItem('localStorageAvatar');
var localStorageProfile = window.localStorage.getItem('localStorageProfile');
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
var localStorageMenu = window.localStorage.getItem('localStorageMenu');
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
var oldPosition = 0;
//set scroll init
window.scrollTo(0, 0);
$(document).scroll(function() {
    if ($(window).scrollTop() + $(window).height() + 400 >= $(document).height() &&
        $(window).scrollTop() + $(window).height() >= oldPosition) {
        alert('vao scroll>>>>>>>>');
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
    oldPosition = $(window).scrollTop() + $(window).height();
});
//login facebook
function onClickLoginFacebook() {
    if (navigator.userAgent.match('CriOS'))
        window.open('https://www.facebook.com/dialog/oauth?client_id=1032633966817570&redirect_uri=' + document.location.href + '&scope=email,public_profile', '', null);
    else
        FB.login(null, { scope: 'email,public_profile' });
};
//end
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
                stories.FileUploads[0]) ? stories.FileUploads[0].FileLocation : null;
            var imageBackground = uidBackground ? '<div class="ui small image">' +
                '<a href="/' + stories.SpeakingUrl + '" class="ui image"' +
                'title="' + stories.Title +
                '" alt="truyện ngắn ailee phan">' +
                '<img alt="truyện ngắn ailee phan" class="height-image-home" src="/download-background/' +
                uidBackground + '"/></a></div>' : '';
            var title = (stories &&
                    stories.Title &&
                    stories.Title &&
                    stories.Title.length !== 0) ? '<h1 class="ui pink header">' +
                '<div class="content">' +
                '<span class="font-header capitalize"><a href="/' + stories.SpeakingUrl +
                '">' +
                stories.Title +
                '</a></span>' +
                '<span class="sub header">' + (stories && stories.AuthorName ? stories.AuthorName : '') +
                '</span></div></h1>' : '';
            var content = ''
            var detail = '<div class="description"><p class="font-content">' +
                stories.ShortContent +
                '</p><a href="/' +
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
