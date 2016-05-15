module.exports = {
    GetListStories: function(req, res) {
        res.view('home/home', { locals: { baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appHome', data: [{ CreatedDate: 'adasda' }], title: 'Ailee Phan' } })
    }
}
