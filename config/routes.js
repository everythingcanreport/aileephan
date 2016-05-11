module.exports.routes = {
    'GET /': {
        controller: 'HomeController',
        action: 'GetListStories'
    },
    'GET /admin/write': {
        controller: 'StoriesController',
        action: 'WriteStories'
    },
    'GET /admin/manage': {
        controller: 'StoriesController',
        action: 'ManageStories'
    },
    'GET /login': {
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
    }
};
