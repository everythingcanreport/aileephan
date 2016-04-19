module.exports = {
    GetListStories: function(req, res) {
        res.view('home/home', { url: req.url, data: [{CreatedDate: 'adasda'}], title: 'Ailee Phan' })
    }
}
