//dropdown menu
$('.connected').dropdown();
var isCreate = true;
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
    if (cookieProfile.name) {
        $('.connected-name').text(cookieProfile.name);
    }
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
                this.getDoc().body.style.fontSize = '16px';
                this.getDoc().body.style.fontFamily = 'UTMCentur';
                $('.write-loader').removeClass('active');
                $('.write-stories').removeClass('hide');
                $('.write-title').focus();
                //set value default edit
                if ($('.write-content-hidden').val()) {
                    tinymce.get('write-content').setContent($('.write-content-hidden').val());
                }
                var fileName = $('.write-background-filename-hidden').val();
                if (fileName) {
                    var ext = fileName.split('.')[fileName.split('.').length - 1];
                    fileName = (fileName.length - ext.length) >= 10 ? fileName.substring(0, 10) + '...' + ext : fileName;
                    $('.title-background span').text(fileName);
                }
                //check status create or edit
                if ($('.write-title').val() &&
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
//login facebook
function onClickLoginFacebook() {
    if (navigator.userAgent.match('CriOS')) {
        window.open('https://www.facebook.com/dialog/oauth?client_id=1032633966817570&redirect_uri=' + document.location.href + '&scope=email,public_profile&response_type=none', '', true);
    } else {
        FB.login(null, { scope: 'email,public_profile' });
    }
};
//end
$('#write-background').change(function(e) {
    if ($('#write-background').prop('files')[0]) {
        $('.background-loader').addClass('active');
        $('.title-background').addClass('disabled');
        var StoriesformData = new FormData();
        StoriesformData.append('background', $('#write-background').prop('files')[0]);
        require(['common/upload', '/libs/notify/toastr.min.js'], function(upload, toastr) {
            upload(StoriesformData)
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
                    $('.title-background').removeClass('disabled');
                    $('.write-background-uid').val(response[0].UID);
                    toastr.success('Tải ảnh nền lên thành công!', 'Thành công', { timeOut: 2000 });
                }, function(err) {
                    $('.background-loader').removeClass('active');
                    $('.title-background').removeClass('disabled');
                    toastr.error('Tải ảnh nền lên thất bại!', 'Thất bại', { timeOut: 2000 });
                });
        });
    }
});

//function validate write stories
function validateWrite() {
    var titleValidate = $('.write-title').val();
    if (!titleValidate ||
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
    $('.write-save-button').addClass('loading');
    $('.write-save-button').addClass('disabled');
    if (validateWrite()) {
        var htmlContent = tinymce.get('write-content').getContent();
        var textContent = tinymce.get('write-content').getContent({ format: 'text' });
        if (textContent &&
            textContent.length > 200) {
            var maxLengthCut = 200 // maximum number of characters to extract
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
                    ShortContent: textContent,
                    AuthorName: cookieProfile ? cookieProfile.name : null
                },
                FileUploads: [{
                    UID: backgroundUID
                }]
            };
            require(['common/create', '/libs/notify/toastr.min.js'], function(create, toastr) {
                create(data)
                    .then(function(response) {
                        toastr.success('Thêm truyện thành công!', 'Thành công', { timeOut: 2000 });
                        require(['menu/menu'], function(menu) {
                            menu.manageStories();
                        });
                    }, function(err) {
                        $('.write-save-button').removeClass('loading');
                        $('.write-save-button').removeClass('disabled');
                        if (err &&
                            err.status === 403) {
                            toastr.warning('Thao tác xâm nhập bảo mật hệ thống. Để thực hiện tính năng này bạn cần Đăng nhập với quyền Quản trị viên!', 'Cảnh báo', { timeOut: 5000 });
                        } else {
                            toastr.error('Thêm truyện thất bại!', 'Thất bại', { timeOut: 2000 });
                        }
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
                    UID: uidStories,
                    AuthorName: cookieProfile ? cookieProfile.name : null
                },
                FileUploads: [{
                    UID: backgroundUID
                }]
            };
            require(['common/update', '/libs/notify/toastr.min.js'], function(update, toastr) {
                update(data)
                    .then(function(response) {
                        require(['menu/menu'], function(menu) {
                            toastr.success('Cập nhật truyện thành công!', 'Thành công', { timeOut: 2000 });
                            menu.manageStories();
                        });
                    }, function(err) {
                        toastr.error('Cập nhật truyện thất bại!', 'Thất bại', { timeOut: 2000 });
                        $('.write-save-button').removeClass('disabled');
                    });
            });
        }
    } else {
        $('.write-save-button').removeClass('disabled');
    }
};

function onClickView() {
    //set data before show modal review
    var htmlContent = tinymce.get('write-content').getContent();
    var title = $('.write-title').val();
    $('.review-description').text('');
    $('.review-description').append(htmlContent);
    $('.review-title').text(title);
    var backgroundUID = $('.write-background-uid').val();
    if (backgroundUID) {
        $('.review-background').attr('src', '/download-background/' + backgroundUID);
        $('.review-background').removeClass('hide');
    } else {
        $('.review-background').addClass('hide');
    }
    var dateWriteReview = new Date();
    if ($('.write-date').val()) {
        dateWriteReview = new Date($('.write-date').val());
    }
    var d = dateWriteReview.getDate() <= 9 ? '0' + dateWriteReview.getDate() : dateWriteReview.getDate();
    var m = (dateWriteReview.getMonth() + 1) <= 9 ? ('0' + (dateWriteReview.getMonth() + 1)) : dateWriteReview.getMonth() + 1;
    var y = dateWriteReview.getFullYear();
    var dateWriteReviewShow = d + '/' + m + '/' + y;
    $('.review-date').text('');
    $('.review-date').append(dateWriteReviewShow);
    //show long modal fixed
    var selfModal = $('.ui.long.modal');
    selfModal.modal({
        onShow: function() {
            setTimeout(function() {
                selfModal.modal('refresh');
            }, 250);
        }
    });
    selfModal.modal('show');
};

function onClickAttachImage() {
    document.getElementById('write-background').click();
};
