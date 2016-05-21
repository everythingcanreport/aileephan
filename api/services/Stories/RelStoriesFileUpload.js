module.exports = function(objRel) {
    var $q = require('q');
    var defer = $q.defer();
    if (!_.isEmpty(objRel) &&
        !_.isEmpty(objRel.where) &&
        _.isArray(objRel.where) &&
        !_.isEmpty(objRel.storiesObject)) {
        return FileUpload.findAll({
                attributes: ['ID'],
                where: {
                    $or: objRel.where
                },
                transaction: objRel.transaction,
                raw: true
            })
            .then(function(fileUpload) {
                fileUpload = _.map(fileUpload, 'ID');
                return objRel.storiesObject.setFileUploads(fileUpload, { transaction: objRel.transaction });
            }, function(err) {
                defer.reject({ error: err });
            })
            .then(function(relStoriesFileUploadCreated) {
                defer.resolve(relStoriesFileUploadCreated);
            }, function(err) {
                defer.reject({ error: err });
            });
    } else {
        defer.reject({ error: 'RelStoriesFileUpload.data.not.exist' });
    }
    return defer.promise;
};
