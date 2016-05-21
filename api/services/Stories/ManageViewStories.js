module.exports = function(uid) {
    var $q = require('q');
    var defer = $q.defer();
    if (HelperService.CheckExistData(uid)) {
        Stories.findOne({
                attributes: ['UID', 'Show', 'Title', 'Content', 'CreatedDate'],
                include: [{
                    model: FileUpload,
                    attributes: ['FileLocation'],
                    where: {
                        Enable: 'Y'
                    },
                    through: {
                        attributes: null
                    },
                    required: false
                }],
                where: {
                    UID: uid
                }
            })
            .then(function(stories) {
                if (!_.isEmpty(stories)) {
                    defer.resolve({ data: stories });
                } else {
                    var error = new Error('ManageViewStories.not.found');
                    defer.reject(error);
                }
            }, function(err) {
                defer.reject(err);
            });
    } else {
        var error = new Error('ManageViewStories.not.found');
        defer.reject(error);
    }
    return defer.promise;
};
