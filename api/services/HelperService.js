module.exports = {
    CheckPostRequest: function(request) {
        var data;
        if (!_.isUndefined(request) &&
            !_.isUndefined(request.body) &&
            !_.isUndefined(request.body.data)) {
            data = request.body.data;
            if (!_.isObject(data)) {
                try {
                    data = JSON.parse(data);
                } catch (err) {
                    sails.log.error(err);
                    return false;
                }
            }
            return data;
        } else {
            return false;
        }
    },
};
