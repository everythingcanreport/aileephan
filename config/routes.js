module.exports.routes = {
    'GET /': {
        controller: 'HomeController',
        action: 'GetListStories'
    },
    'GET /stories/view/:title': {
        controller: 'StoriesController',
        action: 'ViewStories'
    },
    'GET /stories/write': {
        controller: 'StoriesController',
        action: 'WriteStories'
    },
    'GET /stories/manage': {
        controller: 'StoriesController',
        action: 'ManageStories'
    },
    'GET /login': {
        controller: 'OAuthController',
        action: 'Login'
    },
    'GET /help': {
        controller: 'HelperController',
        action: 'HelpMe'
    }
};
