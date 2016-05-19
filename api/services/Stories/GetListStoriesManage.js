module.exports = function(data) {
    var $q = require('q');
    var defer = $q.defer();
    var pagination = Pagination(data, Stories);
    Stories.findAndCountAll({
            attributes: ['UID', 'SpeakingUrl', 'Show', 'Title'],
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
            defer.reject({ error: err });
        });
    return defer.promise;
};
