module.exports = {
    GetListStories: function(req, res) {
        Stories.findAndCountAll({
                attributes: ['SpeakingUrl', 'Title', 'ShortContent', 'CreatedDate'],
                include: [{
                    attributes: ['UID', 'FileLocation'],
                    model: FileUpload,
                    through: {
                        attributes: null
                    },
                    required: false,
                    where: {
                        Enable: "Y"
                    }
                }],
                limit: 5,
                offset: 0,
                order: [['CreatedDate', 'DESC']]
            })
            .then(function(listStories) {
                res.view('home/home', {
                    locals: {
                        baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appHome',
                        data: listStories,
                        title: 'Ailee Phan'
                    }
                });
            }, function(err) {
                res.serverError(err);
            })

    }
};
