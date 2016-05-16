var isCreate = true;
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
                //set value default edit
                if (!_.isNull($('.write-content-hidden').val()) &&
                    !_.isUndefined($('.write-content-hidden').val())) {
                    tinymce.get('write-content').setContent($('.write-content-hidden').val());
                }
                var fileName = $('.write-background-filename-hidden').val();
                if (!_.isNull(fileName) &&
                    !_.isUndefined(fileName)) {
                    var ext = fileName.split('.')[fileName.split('.').length - 1];
                    fileName = fileName.length >= 10 ? fileName.substring(0, 10) + '...' + ext : fileName;
                    $('.title-background span').text(fileName);
                }
                //check status create or edit
                if (!_.isNull($('.write-title').val()) &&
                    !_.isUndefined($('.write-title').val()) &&
                    $('.write-title').val().length !== 0) {
                    isCreate = false;
                    $('.write-save-button').text('Update');
                }
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
                    text: 'Upload background success!',
                    layout: 'topRight',
                    type: 'success',
                    timeout: 3000
                });
                $('.write-background-uid').val(response[0].UID);
            }, function(err) {
                var notyUploadBackground = noty({
                    text: 'Upload background failed!',
                    layout: 'topRight',
                    type: 'error',
                    timeout: 3000
                });
            });
    });
});

function onClickSave() {
    var htmlContent = tinymce.get('write-content').getContent();
    var textContent = tinymce.get('write-content').getContent({ format: 'text' });
    if (!_.isNull(textContent) &&
        !_.isUndefined(textContent) &&
        textContent.length > 300) {
        var maxLengthCut = 300 // maximum number of characters to extract
            //trim the string to the maximum length
        var trimmedString = textContent.substr(0, maxLengthCut);
        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        textContent = trimmedString + ' ...';
    }
    var title = $('.write-title').val();
    var show = $('.write-show').val();
    var backgroundUID = $('.write-background-uid').val();
    if (isCreate) {
        var data = {
            Stories: {
                Title: title,
                Show: show,
                Content: htmlContent,
                ShortContent: textContent
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
                            text: 'Add stories success!',
                            layout: 'topRight',
                            type: 'success',
                            timeout: 3000
                        });
                        setTimeout(function() {
                            menu.manageStories();
                        }, 1000);
                    });
                }, function(err) {
                    var notyUploadBackground = noty({
                        text: 'Add stories failed!',
                        layout: 'topRight',
                        type: 'error',
                        timeout: 3000
                    });
                });
        });
    } else {
        var uidStories = $('.write-uid').val();
        var data = {
            Stories: {
                Title: title,
                Show: show,
                Content: htmlContent,
                ShortContent: textContent,
                UID: uidStories
            },
            FileUploads: [{
                UID: backgroundUID
            }]
        };
        require(['common/update'], function(update) {
            update({ data: data })
                .then(function(response) {
                    require(['menu/menu'], function(menu) {
                        var notyUploadBackground = noty({
                            text: 'Update stories success!',
                            layout: 'topRight',
                            type: 'success',
                            timeout: 3000
                        });
                        setTimeout(function() {
                            menu.manageStories();
                        }, 1000);
                    });
                }, function(err) {
                    var notyUploadBackground = noty({
                        text: 'Update stories failed!',
                        layout: 'topRight',
                        type: 'error',
                        timeout: 3000
                    });
                });
        });
    }
};

function onClickView() {
    require(['/libs/moment-timezone/moment-timezone.js'], function(moment) {
        //set data before show modal review
        var htmlContent = tinymce.get('write-content').getContent();
        var title = $('.write-title').val();
        $('.review-description').append(htmlContent);
        $('.review-title').text(title);
        var backgroundUID = $('.write-background-uid').val();
        $('.review-background').attr('src', '/user/download-background/' + backgroundUID);
        var dateWriteReview = moment().format('DD/MM/YYYY');
        if (!_.isNull($('.write-date').val()) &&
            !_.isUndefined($('.write-date').val())) {
            dateWriteReview = moment($('.write-date').val(), 'ddd MMM DD YYYY HH:mm:ss ZZ').format('DD/MM/YYYY');
        }
        $('.review-date').text('');
        $('.review-date').append('<i class="time pink icon"></i>');
        $('.review-date').append(dateWriteReview);
        $('.long.modal').modal('show');
    });
};

function onClickAttachImage() {
    document.getElementById('write-background').click();
};
