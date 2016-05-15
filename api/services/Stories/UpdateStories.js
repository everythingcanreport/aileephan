module.exports = function(data) {
    var $q = require('q');
    var defer = $q.defer();
    if (!_.isEmpty(data) &&
        !_.isEmpty(data.Stories)) {
        var dataStories = data.Stories;
        dataStories.ModifiedBy = 2121212121;
        sequelize.transaction()
            .then(function(t) {
                return Stories.update(dataStories, {
                        where: {
                            UID: dataStories.UID
                        },
                        transaction: t,
                        individualHooks: true
                    })
                    .then(function(storiesUpdated) {
                        if (!_.isEmpty(storiesUpdated) &&
                            !_.isEmpty(data.FileUploads) &&
                            _.isArray(data.FileUploads)) {
                            var objRelStoriesFileUpload = {
                                storiesObject: storiesUpdated[1][0],
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
        defer.reject({ error: 'UpdateStories.data.not.exist' });
    }
    return defer.promise;
};
