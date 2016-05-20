module.exports = {
    ViewStories: function(req, res) {
        req.validate({
            title: 'string'
        });
        var title = req.param('title');
        Stories.findOne({
                attributes: ['UID', 'SpeakingUrl', 'Show', 'Title', 'Content', 'CreatedDate'],
                include: [{
                    model: FileUpload,
                    attributes: ['UID', 'FileName', 'FileLocation'],
                    where: {
                        Enable: 'Y'
                    },
                    through: {
                        attributes: null
                    },
                    required: false
                }],
                where: {
                    SpeakingUrl: title
                },
            })
            .then(function(stories) {
                if (!_.isEmpty(stories)) {
                    res.view('stories/view', {
                        locals: {
                            url: req.url,
                            baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appViewStories',
                            data: stories
                        }
                    });
                } else {
                    res.notFound('stories.not.found');
                }
            }, function(err) {
                res.serverError(err);
            });
    },
    WriteStories: function(req, res) {
        var uid = req.param('UID');
        if (HelperService.CheckExistData(uid)) {
            Stories.findOne({
                    attributes: ['UID', 'Show', 'Title', 'Content', 'CreatedDate'],
                    include: [{
                        model: FileUpload,
                        attributes: ['UID', 'FileName', 'FileLocation'],
                        where: {
                            Enable: 'Y'
                        },
                        through: {
                            attributes: null
                        },
                        required: false
                    }],
                    where: {
                        UID: uid
                    }
                })
                .then(function(stories) {
                    res.view('stories/write', {
                        locals: {
                            url: req.url,
                            baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appWriteStories',
                            data: stories
                        }
                    });
                }, function(err) {
                    res.serverError(err);
                });
        } else {
            res.view('stories/write', {
                locals: {
                    url: req.url,
                    baseUrlServer: sails.config.aileeConfig.baseUrlServer + '/appWriteStories'
                }
            });
        }
    },
    ManageStories: function(req, res) {
        Stories.findAndCountAll({
                attributes: ['UID', 'SpeakingUrl', 'Show', 'Title'],
                raw: true,
                limit: 5,
                order: [
                    ['CreatedDate', 'DESC']
                ]
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
                        UserAccountID: req.user.id,
                        FileName: fu.filename,
                        FileLocation: fu.fd,
                        FileExtension: fu.type,
                        Enable: 'Y',
                        CreatedBy: req.user.id
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
    DownloadBackground: function(req, res) {
        req.validate({
            UID: 'string'
        });
        FileUpload.findOne({
                attributes: ['FileLocation'],
                where: {
                    UID: req.param('UID')
                }
            })
            .then(function(fileUpload) {
                if (!fileUpload) return res.notFound();
                if (!fileUpload.FileLocation) {
                    return res.notFound();
                }
                var SkipperDisk = require('skipper-disk');
                var fileAdapter = SkipperDisk();
                fileAdapter.read(fileUpload.FileLocation)
                    .on('error', function(err) {
                        return res.serverError(err);
                    })
                    .pipe(res);
            }, function(err) {
                return res.negotiate(err);
            });
    },
    CreateStories: function(req, res) {
        var data = HelperService.CheckPostRequest(req);
        if (data === false) {
            return res.serverError('data failed');
        }
        Services.CreateStories(data, req.user)
            .then(function(success) {
                success.transaction.commit();
                res.ok('success');
            }, function(err) {
                if (HelperService.CheckExistData(err) &&
                    HelperService.CheckExistData(err.transaction) &&
                    HelperService.CheckExistData(err.error)) {
                    err.transaction.rollback();
                    return res.serverError(err.error);
                }
                return res.serverError(err);
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
                        res.serverError(err.error);
                    } else {
                        res.serverError(err);
                    }
                });
        }
    },
    UpdateStories: function(req, res) {
        var data = HelperService.CheckPostRequest(req);
        if (data === false) {
            return res.serverError('data failed');
        }
        Services.UpdateStories(data, req.user)
            .then(function(success) {
                success.transaction.commit();
                res.ok('success');
            }, function(err) {
                if (HelperService.CheckExistData(err) &&
                    HelperService.CheckExistData(err.transaction) &&
                    HelperService.CheckExistData(err.error)) {
                    err.transaction.rollback();
                    return res.serverError(err.error);
                }
                return res.serverError(err);
            });
    },
    UpdateStoriesStatus: function(req, res) {
        var data = HelperService.CheckPostRequest(req);
        if (data === false) {
            return res.serverError('data failed');
        }
        Services.UpdateStoriesStatus(data)
            .then(function(success) {
                res.ok('success');
            }, function(err) {
                if (HelperService.CheckExistData(err) &&
                    HelperService.CheckExistData(err.transaction) &&
                    HelperService.CheckExistData(err.error)) {
                    err.transaction.rollback();
                    return res.serverError(err.error);
                }
                return res.serverError(err);
            });
    },
    ManageViewStories: function(req, res) {
        console.log('req', req.cookies);
        req.validate({
            UID: 'string'
        });
        var uid = req.param('UID');
        Services.ManageViewStories(uid)
            .then(function(responseStories) {
                res.ok(responseStories.data);
            }, function(err) {
                res.serverError(err);
            });
    },
    GetListStories: function(req, res) {
        var data = HelperService.CheckPostRequest(req);
        if (data === false) {
            res.serverError('data failed');
        } else {
            Services.GetListStories(data)
                .then(function(success) {
                    res.ok(success.data);
                }, function(err) {
                    if (HelperService.CheckExistData(err) &&
                        HelperService.CheckExistData(err.transaction) &&
                        HelperService.CheckExistData(err.error)) {
                        err.transaction.rollback();
                        res.serverError(err.error);
                    } else {
                        res.serverError(err);
                    }
                });
        }
    }
};
