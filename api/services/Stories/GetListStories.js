module.exports = function(data) {
    var $q = require('q');
    var defer = $q.defer();
    var pagination = Pagination(data, Stories);
    Stories.findAndCountAll({
            attributes: ['SpeakingUrl', 'Title', 'ShortContent', 'Content', 'CreatedDate', 'CreatedBy'],
            include: [{
                attributes: ['UID', 'FileLocation'],
                model: FileUpload,
                required: false,
                where: pagination.FileUpload
            }],
            where: pagination.Stories,
            limit: pagination.limit,
            offset: pagination.offset,
            order: [
                ['CreatedDate', 'DESC']
            ]
        })
        .then(function(listStories) {
            defer.resolve({ data: listStories });
        }, function(err) {
            defer.reject({
                error: err
            });
        });
    return defer.promise;
};
