module.exports = function(data) {
    var $q = require('q');
    var defer = $q.defer();
    if (!_.isEmpty(data) &&
        !_.isEmpty(data.Stories)) {
        var dataStories = data.Stories;
        dataStories.UID = UUIDService.Create();
        dataStories.CreatedBy = 2121212121;
        sequelize.transaction()
            .then(function(t) {
                return Stories.create(dataStories, {
                        transaction: t
                    })
                    .then(function(storiesCreated) {
                        if (!_.isEmpty(storiesCreated) &&
                            !_.isEmpty(data.FileUploads) &&
                            _.isArray(data.FileUploads)) {
                            var objRelStoriesFileUpload = {
                                storiesObject: storiesCreated,
                                where: data.FileUploads,
                                transaction: t
                            };
                            return Services.RelStoriesFileUpload(objRelStoriesFileUpload);
                        }
                    }, function(err) {
                        defer.reject({
                            error: err,
                            transaction: t
                        });
                    })
                    .then(function(relStorieFileUploadCreated) {
                        defer.resolve({
                            status: 'success',
                            transaction: t
                        });
                    }, function(err) {
                        defer.reject({
                            error: err,
                            transaction: t
                        });
                    });
            }, function(err) {
                defer.reject({ error: err });
            });
    } else {
        defer.reject({ error: 'CreateStories.data.not.exist' });
    }
    return defer.promise;
};
