module.exports.routes = {
    'GET /': {
        controller: 'HomeController',
        action: 'GetListStories'
    },
    'GET /short-stories': {
        controller: 'StoryController',
        action: 'GetDataStory'
    },
    'GET /about': {
        controller: 'AboutController',
        action: 'GetDataAbout'
    },
    'GET /contact': {
        controller: 'ContactController',
        action: 'GetDataContact'
    },
    'GET /short-story/detail': {
        controller: 'StoryController',
        action: 'GetDetailStory'
    },
    'GET /write': {
        controller: 'WriteController',
        action: 'GetDataWrite'
    }
};
