module.exports = {
    Create: function(id) {
        var Hashids = require('hashids');
        var hashids = new Hashids('a747b030-5c9e-4abf-886d-21847df21f8f', 0, '0123456789abcdefghijklmnopqrstuvwxyz');
        return hashids.encode(id);
    }
};
