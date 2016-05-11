module.exports = {
    ViewStories: function(req, res) {
        res.view('stories/view', {
            locals: {
                url: req.url,
                baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appViewStories'
            }
        });
    },
    WriteStories: function(req, res) {
        res.view('stories/write', {
            locals: {
                url: req.url,
                baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appWriteStories'
            }
        });
    },
    ManageStories: function(req, res) {
        Stories.findAndCountAll({
                attributes: ['UID', 'Show', 'Status', 'Title'],
                raw: true,
                limit: 5
            })
            .then(function(stories) {
                res.view('stories/manage', {
                    locals: {
                        data: stories,
                        url: req.url,
                        baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appManageStories'
                    }
                });
            }, function(err) {
                res.serverError(err);
            });
    },
    UploadBackground: function(req, res) {
        req.file('background').upload({
            dirname: '../../uploads/',
            maxBytes: 25000000
        }, function whenDone(err, fileUploads) {
            if (err) {
                //upload error
                return res.negotiate(err);
            }
            if (fileUploads.length === 0) {
                //not file uploaded
                return res.badRequest('No file was uploaded');
            }
            //upload success
            var arrayFileUpload = [];
            if (!_.isEmpty(fileUploads) &&
                _.isArray(fileUploads)) {
                _.forEach(fileUploads, function(fu, index) {
                    var objFU = {
                        UID: UUIDService.Create(),
                        UserAccountID: 21212121212,
                        FileName: fu.filename,
                        FileLocation: fu.fd,
                        FileExtension: fu.type,
                        Enable: 'Y',
                        CreatedBy: 21212121212
                    };
                    arrayFileUpload.push(objFU);
                });
            }
            FileUpload.bulkCreate(arrayFileUpload, { raw: true })
                .then(function(fileUploadCreated) {
                    return res.ok(fileUploadCreated);
                }, function(err) {
                    return res.badRequest(err);
                });
        });
    },
    CreateStories: function(req, res) {
        var data = HelperService.CheckPostRequest(req);
        if (data === false) {
            return res.serverError('data failed');
        }
        Services.CreateStories(data)
            .then(function(success) {
                success.transaction.commit();
                res.ok('success');
            }, function(err) {
                if (HelperService.CheckExistData(err) &&
                    HelperService.CheckExistData(err.transaction) &&
                    HelperService.CheckExistData(err.error)) {
                    err.transaction.rollback();
                    return res.serverError(ErrorWrap(err.error));
                }
                return res.serverError(ErrorWrap(err));
            });
    },
    GetListStoriesManage: function(req, res) {
        var data = HelperService.CheckPostRequest(req);
        if (data === false) {
            res.serverError('data failed');
        } else {
            Services.GetListStoriesManage(data)
                .then(function(success) {
                    res.ok(success.data);
                }, function(err) {
                    if (HelperService.CheckExistData(err) &&
                        HelperService.CheckExistData(err.transaction) &&
                        HelperService.CheckExistData(err.error)) {
                        err.transaction.rollback();
                        res.serverError(ErrorWrap(err.error));
                    } else {
                        res.serverError(ErrorWrap(err));
                    }
                });
        }
    }
};
