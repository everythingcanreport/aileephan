module.exports = function(isAdmin) {
    if (isAdmin) {
        return [
            { Name: 'Write Stoties', icon: 'write', func: 'writeStories();' },
            { Name: 'Manage Stories', icon: 'book', func: 'manageStories();' },
            { Name: 'Logout', icon: 'key', func: 'FB.logout();' }
        ];
    } else {
        return [
            { Name: 'Logout', icon: 'key', func: 'FB.logout();' },
            { Name: 'Helper', icon: 'help', func: 'help();' }
        ];
    }
};
