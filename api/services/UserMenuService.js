module.exports = function(isAdmin) {
    if (isAdmin) {
        return [
            { Name: 'Viết truyện', icon: 'write', func: 'writeStories();' },
            { Name: 'Quản lý truyện', icon: 'book', func: 'manageStories();' },
            { Name: 'Thoát', icon: 'key', func: 'FB.logout();' }
        ];
    } else {
        return [
            { Name: 'Thoát', icon: 'key', func: 'FB.logout();' },
            { Name: 'Trợ giúp', icon: 'help', func: 'help();' }
        ];
    }
};
