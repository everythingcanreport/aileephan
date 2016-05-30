module.exports = {
    GetListStories: function(req, res) {
        Stories.findAndCountAll({
                attributes: ['SpeakingUrl', 'Title', 'ShortContent', 'AuthorName', 'CreatedDate', 'CreatedBy'],
                include: [{
                    attributes: ['UID'],
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
                where: {
                    Show: 'Y'
                },
                order: [
                    ['CreatedDate', 'DESC']
                ]
            })
            .then(function(listStories) {
                res.view('home/home', {
                    locals: {
                        baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/app/appHome',
                        data: listStories,
                        title: 'Ailee Phan - Truyện ngôn tình trong đời sống'
                    }
                });
            }, function(err) {
                res.serverError(err);
            })

    }
};
