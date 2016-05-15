module.exports = function(data) {
    var $q = require('q');
    var defer = $q.defer();
    if (!_.isEmpty(data) &&
        HelperService.CheckExistData(data.Show) &&
        HelperService.CheckExistData(data.UID)) {
        Stories.update({
                Show: data.Show
            }, {
                where: {
                    UID: data.UID
                },
                individualHooks: true
            })
            .then(function(storiesUpdated) {
                if (!_.isEmpty(storiesUpdated) &&
                    storiesUpdated[1] !== 0) {
                    defer.resolve(storiesUpdated);
                } else {
                    var error = new Error('UpdateStoriesStatus.stories.not.exist');
                    defer.reject(error);
                }
            }, function(err) {
                defer.reject(err);
            });
    } else {
        var error = new Error('UpdateStoriesStatus.data.not.exist');
        defer.reject(error);
    }
    return defer.promise;
};
