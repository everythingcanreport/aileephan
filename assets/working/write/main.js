var isCreate = true;
var accessToken = null;
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
                accessToken = response.authResponse.accessToken;
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
                this.getDoc().body.style.fontSize = '20px';
                // this.getDoc().body.style.fontFamily = 'serif';
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
        upload(StoriesformData, accessToken)
            .then(function(response) {
                var fileName = null;
                var ext = response[0].FileName.split('.')[response[0].FileName.split('.').length - 1];
                var fileName = null;
                if (response[0].FileName.length - ext.length >= 10) {
                    fileName = response[0].FileName.substring(0, 10) + '...' + ext;
                } else {
                    fileName = response[0].FileName;
                }
                $('.title-background span').text(fileName);
                $('.background-loader').removeClass('active');
                $('.write-background-uid').val(response[0].UID);
                var notyUploadBackground = noty({
                    text: 'Tải ảnh nền lên thành công!',
                    layout: 'topRight',
                    type: 'success',
                    timeout: 3000
                });
            }, function(err) {
                var notyUploadBackground = noty({
                    text: 'Tải ảnh nền lên thất bại!',
                    layout: 'topRight',
                    type: 'error',
                    timeout: 3000
                });
            });
    });
});

//function validate write stories
function validateWrite() {
    var titleValidate = $('.write-title').val();
    if (_.isNull(titleValidate) ||
        _.isUndefined(titleValidate) ||
        titleValidate.length === 0) {
        $('.validate-title').addClass('error');
        $('.error-message-write').text('');
        $('.error-message-write').append('<ul class="list"><li>Vui lòng nhập tiêu đề!</li></ul>');
        $('.error-message-write').removeClass('hide');
        return false;
    } else if (titleValidate.length > 255) {
        $('.validate-title').addClass('error');
        $('.error-message-write').text('');
        $('.error-message-write').append('<ul class="list"><li>Tiêu đề không được quá 255 ký tự!</li></ul>');
        $('.error-message-write').removeClass('hide');
        return false;
    } else {
        $('.validate-title').removeClass('error');
        $('.error-message-write').addClass('hide');
        return true;
    }
};
//end

function onClickSave() {
    if (validateWrite()) {
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
                create(data, accessToken)
                    .then(function(response) {
                        require(['menu/menu'], function(menu) {
                            var notyUploadBackground = noty({
                                text: 'Thêm truyện thành công!',
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
                            text: 'Thêm truyện thất bại!',
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
                update(data, accessToken)
                    .then(function(response) {
                        require(['menu/menu'], function(menu) {
                            var notyUploadBackground = noty({
                                text: 'Cập nhật truyện thành công!',
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
                            text: 'Cập nhật truyện thất bại!',
                            layout: 'topRight',
                            type: 'error',
                            timeout: 3000
                        });
                    });
            });
        }
    }
};

function onClickView() {
    require(['/libs/moment-timezone/moment-timezone.js'], function(moment) {
        //set data before show modal review
        var htmlContent = tinymce.get('write-content').getContent();
        var title = $('.write-title').val();
        $('.review-description').text('');
        $('.review-description').append(htmlContent);
        $('.review-title').text(title);
        var backgroundUID = $('.write-background-uid').val();
        if (!_.isNull(backgroundUID) &&
            !_.isUndefined(backgroundUID)) {
            $('.review-background').removeClass('hide');
        } else {
            $('.review-background').addClass('hide');
        }
        $('.review-background').attr('src', '/user/download-background/' + backgroundUID);
        var dateWriteReview = moment().format('DD/MM/YYYY');
        if (!_.isNull($('.write-date').val()) &&
            !_.isUndefined($('.write-date').val())) {
            dateWriteReview = moment($('.write-date').val(), 'ddd MMM DD YYYY HH:mm:ss ZZ').format('DD/MM/YYYY');
        }
        $('.review-date').text('');
        $('.review-date').append(dateWriteReview);
        $('.long.modal').modal('show');
    });
};

function onClickAttachImage() {
    document.getElementById('write-background').click();
};
