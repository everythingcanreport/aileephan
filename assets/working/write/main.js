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
        selector: 'textarea#write-content',
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

$('#write-background').change(function(e) {
    $('.background-loader').addClass('active');
    var StoriesformData = new FormData();
    StoriesformData.append('background', $('#write-background').prop('files')[0]);
    require(['common/upload'], function(upload) {
        upload(StoriesformData)
            .then(function(response) {
                var fileName = null;
                var ext = response[0].FileName.split('.')[response[0].FileName.split('.').length - 1];
                var fileName = response[0].FileName.length >= 10 ? response[0].FileName.substring(0, 10) + '...' + ext : response[0].FileName;
                $('.title-background span').text(fileName);
                $('.background-loader').removeClass('active');
                var notyUploadBackground = noty({
                    text: 'Tải ảnh nền thành công!',
                    layout: 'topRight',
                    type: 'success',
                    timeout: 3000
                });
                $('.write-background-uid').val(response[0].UID);
            }, function(err) {
                var notyUploadBackground = noty({
                    text: 'Tải ảnh nền thất bại!',
                    layout: 'topRight',
                    type: 'error',
                    timeout: 3000
                });
            });
    });
});

function onClickSave() {
    var htmlContent = tinymce.get('write-content').getContent();
    var title = $('.write-title').val();
    var show = $('.write-show').val();
    var backgroundUID = $('.write-background-uid').val();
    var data = {
        Stories: {
            Title: title,
            Show: show,
            Status: 'Đang viết',
            Content: htmlContent,
        },
        FileUploads: [{
            UID: backgroundUID
        }]
    };
    require(['common/create'], function(create) {
        create({ data: data })
            .then(function(response) {
                require(['menu/menu'], function(menu) {
                    var notyUploadBackground = noty({
                        text: 'Thêm truyện thành công!',
                        layout: 'topRight',
                        type: 'success',
                        timeout: 3000
                    });
                    menu.manageStories();
                });
            }, function(err) {
                var notyUploadBackground = noty({
                    text: 'Thêm truyện thất bại!',
                    layout: 'topRight',
                    type: 'error',
                    timeout: 3000
                });
            });
    });
};

function onClickView() {
    console.log('view>>>');
};

function onClickAttachImage() {
    document.getElementById('write-background').click();
};
