module.exports = {
    ViewStories: function(req, res) {
        res.view('stories/view', { locals: { url: req.url, baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appViewStories' } })
    },
    WriteStories: function(req, res) {
        res.view('stories/write', { locals: { url: req.url, baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appWriteStories' } })

    },
    ManageStories: function(req, res) {
    	        res.view('stories/manage', { locals: { url: req.url, baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appManageStories' } })
    }
};
