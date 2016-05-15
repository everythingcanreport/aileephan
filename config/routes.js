module.exports.routes = {
    'GET /': {
        controller: 'HomeController',
        action: 'GetListStories'
    },
    'GET /view/:title': {
        controller: 'StoriesController',
        action: 'ViewStories'
    },
    'GET /admin/write/(:UID)?': {
        controller: 'StoriesController',
        action: 'WriteStories'
    },
    'GET /admin/manage': {
        controller: 'StoriesController',
        action: 'ManageStories'
    },
    'GET /fb/login': {
        controller: 'OAuthController',
        action: 'Login'
    },
    'POST /admin/write/upload-background': {
        controller: 'StoriesController',
        action: 'UploadBackground'
    },
    'POST /admin/create': {
        controller: 'StoriesController',
        action: 'CreateStories'
    },
    'POST /admin/manage/list': {
        controller: 'StoriesController',
        action: 'GetListStoriesManage'
    },
    'POST /admin/update': {
        controller: 'StoriesController',
        action: 'UpdateStories'
    },
    'GET /user/download-backround/:UID': {
        controller: 'StoriesController',
        action: 'DownloadBackground'
    },
    'POST /admin/update-status': {
        controller: 'StoriesController',
        action: 'UpdateStoriesStatus'
    },
    'GET /admin/view/:UID': {
        controller: 'StoriesController',
        action: 'ManageViewStories'
    }
};
