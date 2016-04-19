module.exports = {
    GetDataStory: function(req, res) {
        res.view('story/story', { url: req.url, title: 'Ailee Phan' });
    },
    GetDetailStory: function(req, res) {
    	res.view('story/detail', {url: req.url})
    }
};
