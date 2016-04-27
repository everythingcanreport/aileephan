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
                response.status !== 'connected') {
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
    //tinymce plugin
    tinymce.init({
        selector: 'textarea#content',
        // auto_focus: 'content',
        elementpath: false,
        max_height: 500,
        menu: {},
        toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright',
        height: 300,
        setup: function(ed) {
            ed.on('init', function() {
                this.getDoc().body.style.fontSize = '14px';
                $('.write-loader').removeClass('active');
                $('.write-stories').removeClass('hide');
                $('.write-title').focus();
            });
        }
    });
    //end tinymce plugin

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

function help() {
    require(['menu/menu'], function(menu) {
        menu.help();
    });
};
