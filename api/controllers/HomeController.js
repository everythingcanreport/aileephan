module.exports = {
    GetListStories: function(req, res) {
        res.view('home/home', {locals: { url: req.url, baseUrlServer: sails.config.aileeConfig.baseUrlServer+'/appHome', data: [{ CreatedDate: 'adasda' }], title: 'Ailee Phan' }})
    }
}
