module.exports = {
    GetListStories: function(req, res) {
        res.view('home/home', { locals: { isSearch: true, baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appHome', data: [{ CreatedDate: 'adasda' }], title: 'Ailee Phan' } })
    }
}
