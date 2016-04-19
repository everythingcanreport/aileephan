module.exports = {
    GetDataAbout: function(req, res) {
        res.view('about/about', {url: req.url, dataAbout: null, title: 'Ailee Phan' });
    }
};
