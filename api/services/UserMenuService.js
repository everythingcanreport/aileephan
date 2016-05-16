module.exports = function(isAdmin) {
    if (isAdmin) {
        return [
            { Name: 'Thêm mới', icon: 'write', func: 'writeStories();' },
            { Name: 'Quản lí', icon: 'book', func: 'manageStories();' },
            { Name: 'Thoát', icon: 'key', func: 'FB.logout();' }
        ];
    } else {
        return [
            { Name: 'Thoát', icon: 'key', func: 'FB.logout();' }
        ];
    }
};
