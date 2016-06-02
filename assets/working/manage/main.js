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
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    //end facebook plugin

});

//menu write stories
function writeStories() {
    require(['menu/menu'], function(menu) {
        menu.writeStories();
    });
};
//end

//menu manage stories
function manageStories() {
    require(['menu/menu'], function(menu) {
        menu.manageStories();
    });
};
//end

//load list stories
function loadList(limit, offset) {
    var filterTitle = $('.filter-title').val();
    if (!filterTitle ||
        filterTitle.length === 0) {
        filterTitle = null;
    }
    var filterShow = $('input[name=manage_show]:checked').val();
    var filterHide = $('input[name=manage_hide]:checked').val();
    var filterShowHide = null;
    if ((filterShow === '' ||
            !filterShow) &&
        filterHide === 'Y') {
        filterShowHide = {
            $ne: 'Y'
        };
    } else if (filterShow === 'Y' &&
        (filterHide === '' ||
            !filterHide)) {
        filterShowHide = 'Y'
    } else if ((filterHide === '' ||
            !filterHide) &&
        (filterShow === '' ||
            !filterShow)) {
        filterShowHide = 'N/A';
    }
    var data = {
        Filter: [{
            Stories: {
                Show: filterShowHide
            }
        }],
        Search: [{
            Stories: {
                SpeakingUrl: filterTitle
            }
        }],
        Limit: limit || 5,
        Offset: offset || 0
    };
    $.ajax({
        type: 'POST',
        url: 'http://aileephan.com/admin/manage/list',
        // url: 'http://localhost:1337/admin/manage/list',
        data: {
            data: JSON.stringify(data)
        },
        success: function(response) {
            renderData(response);
        },
        error: function(err) {
            require(['/libs/notify/toastr.min.js'], function(toastr) {
                toastr.error('Tải truyện thất bại!', 'Thất bại', { timeOut: 2000 });
            });
        }
    });
};
//end
//login facebook
function onClickLoginFacebook() {
    if (navigator.userAgent.match('CriOS')) {
        window.open('https://www.facebook.com/dialog/oauth?client_id=1032633966817570&redirect_uri=' + document.location.href + '&scope=email,public_profile&response_type=none', '', true);
    } else {
        FB.login(null, { scope: 'email,public_profile' });
    }
};
//end
//renderData
function renderData(response) {
    //append and set value filter
    $('tbody').text('');
    if (response &&
        response.count !== 0 &&
        response.rows) {
        //rerender data manage
        response.rows.forEach(function(stories, index) {
            var no = '<td class="font-brand">' + (index + 1 + (currentPage - 1) * 5) + '</td>';
            var title = '<td colspan="2"><h4 class="ui header">' +
                '<div class="content font-header-normal">' + stories.Title + '</div></h4></td>';
            var show = stories.Show === 'Y' ? '<td class="center aligned">' +
                '<div class="ui fitted slider checkbox">' +
                '<input title="Cập nhật trạng thái truyện" type="checkbox" name="change-status-' + stories.UID +
                '" onChange="onChangeShow(\'' + stories.UID + '\');"  checked="true"/>' +
                '<label></label></div></td>' : '<td class="center aligned">' +
                '<div class="ui fitted slider checkbox">' +
                '<input title="Cập nhật trạng thái truyện" type="checkbox" name="change-status-' + stories.UID +
                '" onChange="onChangeShow(\'' + stories.UID + '\');"/>' +
                '<label></label></div></td>';
            var action = '<td><div class="ui buttons tiny icon">' +
                '<a title="Xem lại truyện" class="ui grey button font-button" onClick="onClickView(\'' + stories.UID + '\');">' +
                '<i class="icon search"></i>Xem</a>' +
                '<div class="or"></div>' +
                '<a title="Cập nhật truyện" class="ui pink button font-button" onClick="onClickEdit(\'' + stories.UID + '\');">' +
                '<i class="icon write"></i>Sửa</a></div></td>';
            $('tbody').append('<tr>' + no + title + show + action + '</tr>');
            $('.manage-pagination').removeClass('hide');
        });
        //rerender pagination
        $('.manage-pagination-main').text('');
        $('.manage-pagination-main').append('<a title="Trang trước" class="icon item ' + (currentPage === 1 ? 'disabled' : '') + '" onClick="paginationManage(\'prev\');"><i class="left chevron icon"></i></a>');
        var totalPage = Math.ceil(response.count / 5);
        totalPageCurrent = totalPage;
        var hasDisbleItemPrev = false;
        var hasDisbleItemNext = false;
        if (currentPage === 1 ||
            currentPage === totalPage) {
            if (currentPage === 1) {
                if (totalPage > 4) {
                    for (i = 1; i <= 3; i++) {
                        $('.manage-pagination-main').append('<a class="item manage-pagination-' + (i == currentPage ? ' active' : '') + '" onClick="paginationManage(' + i + ');">' + i + '</a>');
                    }
                    $('.manage-pagination-main').append('<a class="disabled item">...</a>');
                    $('.manage-pagination-main').append('<a class="item manage-pagination-' + (totalPage == currentPage ? ' active' : '') + '" onClick="paginationManage(' + totalPage + ');">' + totalPage + '</a>');
                } else {
                    for (i = 1; i <= totalPage; i++) {
                        $('.manage-pagination-main').append('<a class="item manage-pagination-' + (i == currentPage ? ' active' : '') + '" onClick="paginationManage(' + i + ');">' + i + '</a>');
                    }
                }

            } else {
                if (totalPage > 4) {
                    $('.manage-pagination-main').append('<a class="item manage-pagination-' + (1 == currentPage ? ' active' : '') + '" onClick="paginationManage(' + 1 + ');">' + 1 + '</a>');
                    $('.manage-pagination-main').append('<a class="disabled item">...</a>');
                    for (i = totalPage - 2; i <= totalPage; i++) {
                        $('.manage-pagination-main').append('<a class="item manage-pagination-' + (i == currentPage ? ' active' : '') + '" onClick="paginationManage(' + i + ');">' + i + '</a>');
                    }
                } else {
                    for (i = 1; i <= totalPage; i++) {
                        $('.manage-pagination-main').append('<a class="item manage-pagination-' + (i == currentPage ? ' active' : '') + '" onClick="paginationManage(' + i + ');">' + i + '</a>');
                    }
                }
            }
        } else {
            for (var i = 1; i <= totalPage; i++) {
                if (i !== 1 &&
                    i !== totalPage) {
                    if (!hasDisbleItemPrev ||
                        !hasDisbleItemNext) {
                        if (i + 1 < currentPage) {
                            if (!hasDisbleItemPrev) {
                                $('.manage-pagination-main').append('<a class="disabled item">...</a>');
                                hasDisbleItemPrev = true;
                            }
                        } else if (i - 1 > currentPage) {
                            if (!hasDisbleItemNext) {
                                $('.manage-pagination-main').append('<a class="disabled item">...</a>');
                                hasDisbleItemNext = true;
                            }
                        } else {
                            $('.manage-pagination-main').append('<a class="item manage-pagination-' + (i == currentPage ? ' active' : '') + '" onClick="paginationManage(' + i + ');">' + i + '</a>');
                        }
                    } else {
                        $('.manage-pagination-main').append('<a class="item manage-pagination-' + (totalPage == currentPage ? ' active' : '') + '" onClick="paginationManage(' + totalPage + ');">' + totalPage + '</a>');
                        $('.manage-pagination-main').append('<a title="Trang sau" class="icon item ' + (currentPage === totalPage ? 'disabled' : '') + '" onClick="paginationManage(\'next\');"><i class="right chevron icon"></i></a>');
                        return false;
                    }
                } else {
                    $('.manage-pagination-main').append('<a class="item manage-pagination-' + (i == currentPage ? ' active' : '') + '" onClick="paginationManage(' + i + ');">' + i + '</a>');
                }
            }
        }
        $('.manage-pagination-main').append('<a title="Trang sau" class="icon item ' + (currentPage === totalPage ? 'disabled' : '') + '" onClick="paginationManage(\'next\');"><i class="right chevron icon"></i></a>');
        $('.manage-pagination-main').removeClass('hide');
    } else {
        for (var i = 0; i <= 6; i++) {
            $('tbody').append('<tr><td></td><td colspan="2"></td><td></td><td></td></tr>');
        }
        $('.manage-pagination-main').addClass('hide');
    }
    //set total for pagination
    $('.manage-total').text('Tổng cộng: ' + response.count + ' truyện');
};
//end

//pagination
var currentPage = 1;
var totalPageCurrent = $('.total-current-page-inpput').val();

function paginationManage(page) {
    if ((page === 'prev' &&
            currentPage === 1) ||
        (page === 'next' &&
            totalPageCurrent === currentPage)) {
        return false;
    } else {
        if (page === 'prev') {
            currentPage -= 1;
            var offset = (currentPage - 1) * 5;
        } else if (page === 'next') {
            currentPage += 1;
            var offset = (currentPage - 1) * 5;
        } else {
            currentPage = page;
            var offset = (currentPage - 1) * 5;
        }
        loadList(5, offset);
    }
};
//end

//edit stories
function onClickEdit(uid) {
    require(['menu/menu'], function(menu) {
        menu.writeStories(uid);
    });
};
//end

//view stories
function onClickView(uid) {
    require(['common/manageViewStories', '/libs/notify/toastr.min.js'], function(manageViewStories, toastr) {
        manageViewStories(uid)
            .then(function(stories) {
                if (stories) {
                    //set data before show modal review
                    var htmlContent = stories.Content;
                    var title = stories.Title;
                    $('.review-description').text('');
                    $('.review-description').append(htmlContent);
                    $('.review-title').text(title);
                    var backgroundUID = (stories && stories.FileUploads && stories.FileUploads[0] ? stories.FileUploads[0].UID : null);
                    if (backgroundUID !== null) {
                        $('.review-background').removeClass('hide');
                    } else {
                        $('.review-background').addClass('hide');
                    }
                    $('.review-background').attr('src', '/download-background/' + backgroundUID);
                    var dateWriteReview = new Date();
                    if (stories.CreatedDate) {
                        dateWriteReview = new Date(stories.CreatedDate);
                    }
                    var d = dateWriteReview.getDate() <= 9 ? '0' + dateWriteReview.getDate() : dateWriteReview.getDate();
                    var m = (dateWriteReview.getMonth() + 1) <= 9 ? ('0' + (dateWriteReview.getMonth() + 1)) : dateWriteReview.getMonth() + 1;
                    var y = dateWriteReview.getFullYear();
                    var dateWriteReviewShow = d + '/' + m + '/' + y;
                    $('.review-date').text('');
                    $('.review-date').append(dateWriteReviewShow);
                    //show long modal fixed
                    // var selfModal = $('.ui.long.modal');
                    // selfModal.modal({
                    //     onShow: function() {
                    //         setTimeout(function() {
                    //             selfModal.modal('refresh');
                    //         }, 250);
                    //     }
                    // });
                    // selfModal.modal('show');
                    $('.ui.modal').modal('show');
                } else {
                    toastr.error('Tải truyện thất bại!', 'Thất bại', { timeOut: 2000 });
                }
            }, function(err) {
                toastr.error('Tải truyện thất bại!', 'Thất bại', { timeOut: 2000 });
            });
    });
};
//end

//keypress search
function onKeypressSearch(e) {
    if (e &&
        e.keyCode === 13) {
        loadList();
    }
};

//onChangeShow stories
function onChangeShow(uid) {
    $('.confirm-change-status').val(uid);
    $('.small.modal.change-status').modal('show');
};
//end

//confirm change status no
function onClickChangeStatusNo() {
    var uid = $('.confirm-change-status').val();
    var showUpdate = $('input[name=change-status-' + uid + ']:checked').val();
    if (!showUpdate ||
        showUpdate.length === 0) {
        showUpdate = "N";
    }
    //rollback checkbox status
    if (showUpdate === 'N') {
        $('input[name=change-status-' + uid + ']').prop('checked', true);
    } else {
        $('input[name=change-status-' + uid + ']').removeAttr('checked');
    }
    $('.small.modal.change-status').modal('hide');
};
//end

//confirm change status yes
function onClickChangeStatusYes() {
    $('.button-yes').addClass('disabled');
    var uid = $('.confirm-change-status').val();
    if (uid &&
        uid.length !== 0) {
        var showUpdate = $('input[name=change-status-' + uid + ']:checked').val();
        if (!showUpdate ||
            showUpdate.length === 0) {
            showUpdate = "N";
        } else {
            showUpdate = "Y";
        }
        require(['common/updateStatus', '/libs/notify/toastr.min.js'], function(updateStatus, toastr) {
            var dataUpdateStatus = {
                data: {
                    Show: showUpdate,
                    UID: uid
                }
            };
            updateStatus(dataUpdateStatus)
                .then(function(response) {
                    $('.small.modal.change-status').modal('hide');
                    $('.button-yes').removeClass('disabled');
                    toastr.success('Cập nhật trạng thái truyện thành công!!', 'Thành công', { timeOut: 2000 });
                }, function(err) {
                    //rollback checkbox status
                    if (showUpdate === 'N') {
                        $('input[name=change-status-' + uid + ']').prop('checked', true);
                    } else {
                        $('input[name=change-status-' + uid + ']').removeAttr('checked');
                    }
                    $('.small.modal.change-status').modal('hide');
                    toastr.error('Cập nhật trạng thái truyện thất bại!', 'Thất bại', { timeOut: 2000 });
                });
        });
    } else {
        toastr.error('Cập nhật trạng thái truyện thất bại!', 'Thất bại', { timeOut: 2000 });
    }
};
//end
