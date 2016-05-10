module.exports.routes = {
    'GET /': {
        controller: 'HomeController',
        action: 'GetListStories'
    },
    // 'GET /truyen/:tieude': {
    //     controller: 'StoriesController',
    //     action: 'ViewStories'
    // },
    'GET /truyen/viet-truyen': {
        controller: 'StoriesController',
        action: 'WriteStories'
    },
    'GET /truyen/quan-ly-truyen': {
        controller: 'StoriesController',
        action: 'ManageStories'
    },
    'GET /dang-nhap': {
        controller: 'OAuthController',
        action: 'Login'
    },
    'GET /tro-giup': {
        controller: 'HelperController',
        action: 'HelpMe'
    },
    'POST /truyen/viet-truyen/upload-background': {
        controller: 'StoriesController',
        action: 'UploadBackground'
    },
    'POST /truyen/them-moi': {
        controller: 'StoriesController',
        action: 'CreateStories'
    }
};
