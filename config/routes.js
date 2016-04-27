module.exports.routes = {
    'GET /': {
        controller: 'HomeController',
        action: 'GetListStories'
    },
    'GET /truyen/:tieu-de': {
        controller: 'StoriesController',
        action: 'ViewStories'
    },
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
    }
};
