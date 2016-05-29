module.exports = function(isAdmin) {
    if (isAdmin) {
        return {
            isAdmin: true
        }
    } else {
        return {
            isAdmin: false
        }
    }
};