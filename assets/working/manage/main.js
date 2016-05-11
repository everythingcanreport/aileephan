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
                $('.loader').removeClass('active');
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

function loadList(limit, offset) {
    var filterTitle = $('.filter-title').val();
    var filterStatus = $('.filter-status').val();
    var filterShow = $('.filter-show').val();
    var data = {
        Filter: [{
            Stories: {
                Title: filterTitle,
                Status: filterStatus,
                Show: filterShow
            }
        }],
        Limit: limit || 5,
        Offset: offset || 0
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:1337/admin/manage/list',
        data: {
            data: JSON.stringify(data)
        },
        success: function(response) {
            //append and set value filter
            $('tbody').text('');
            $('tbody').append('<tr><td></td><td><div class="ui small input">' +
                '<input type="text" class="filter-title" placeholder="Title..." onChange="loadList();"/>' +
                '</div></td><td><select class="ui dropdown filter-status" onChange="loadList();">' +
                '<option value="">---Select---</option><option value="Pending">Pending</option>' +
                '<option value="Finish">Finish</option></select></td>' +
                '<td><select class="ui dropdown filter-show" onChange="loadList();">' +
                '<option value="">---Select---</option><option value="Y">Yes</option>' +
                '<option value="N">No</option></select></td></tr>');
            $('.filter-title').val(filterTitle);
            $('.filter-status').val(filterStatus);
            $('.filter-show').val(filterShow);
            if (!_.isEmpty(response) &&
                response.count !== 0 &&
                !_.isEmpty(response.rows)) {
                _.forEach(response.rows, function(stories, index) {
                    var no = '<td>' + (index + 1 + (offset ? offset : 0)) + '</td>';
                    var title = '<td>' + stories.Title + '</td>';
                    var status = '<td>' + stories.Status + '</td>';
                    var show = stories.Show === 'Y' ? '<td><div class="ui checkbox">' +
                        '<input type="checkbox" name="' + stories.UID + '" checked="true"/>' +
                        '<label></label></div></td>' : '<td><div class="ui checkbox">' +
                        '<input type="checkbox" name="' + stories.UID + '"/>' +
                        '<label></label></div></td>';
                    var action = '<td><a class="ui button mini pink">View</a>' +
                        '<a class="ui button mini pink">Edit</a></td>';
                    $('tbody').append('<tr>' + no + title + status + show + action + '</tr>');
                    $('.manage-pagination').removeClass('hide');
                });
            } else {
                $('.manage-pagination').addClass('hide');
            }
            $('.manage-total span').text('Total: ' + response.count);
        },
        error: function(err) {
            var notyUploadBackground = noty({
                text: 'Load list failed!',
                layout: 'topRight',
                type: 'error',
                timeout: 3000
            });
        }
    });
};

function paginationManage(page) {
    var offset = (page - 1) * 5;
    loadList(5, offset);
};
