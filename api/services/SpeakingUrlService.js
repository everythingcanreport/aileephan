module.exports = function(url) {
    var getSlug = require('speakingurl');
    var urlResponse = null;
    if (!_.isUndefined(url) &&
        !_.isNull(url) &&
        url.length !== 0) {
        urlResponse = getSlug(url);
    }
    return urlResponse;
};
