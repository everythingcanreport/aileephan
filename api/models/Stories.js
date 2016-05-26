module.exports = {
    attributes: {
        ID: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'Must be an integer!'
                }
            },
            primaryKey: true
        },
        UID: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                isUUID: {
                    args: 4,
                    msg: 'Must be an UUID V4!'
                }
            }
        },
        SpeakingUrl: {
            type: Sequelize.STRING(255),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 255],
                    msg: 'Too long!'
                }
            }
        },
        Title: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 255],
                    msg: 'Too long!'
                }
            }
        },
        Show: {
            type: Sequelize.STRING(1),
            allowNull: false,
            comment: 'Y/N',
            validate: {
                len: {
                    args: [0, 1],
                    msg: 'Too long!'
                }
            }
        },
        ShortContent: {
            type: Sequelize.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 500],
                    msg: 'Too long!'
                }
            }
        },
        Content: {
            type: Sequelize.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 4294967295],
                    msg: 'Too long!'
                }
            }
        },
        AuthorName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 255],
                    msg: 'Too long!'
                }
            }
        },
        CreatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                isDate: {
                    msg: 'Invalid!'
                }
            }
        },
        CreatedBy: {
            type: Sequelize.BIGINT(20),
            allowNull: true,
            validate: {
                isInt: {
                    msg: 'Must be an integer!'
                }
            }
        },
        ModifiedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                isDate: {
                    msg: 'Invalid!'
                }
            }
        },
        ModifiedBy: {
            type: Sequelize.BIGINT(20),
            allowNull: true,
            validate: {
                isInt: {
                    msg: 'Must be an integer!'
                }
            }
        }
    },
    associations: function() {},
    options: {
        freezeTableName: true,
        createdAt: 'CreatedDate',
        updatedAt: 'ModifiedDate',
        hooks: {
            afterCreate: function(stories, options, callback) {
                if (!_.isEmpty(stories) &&
                    !_.isEmpty(stories.dataValues) &&
                    HelperService.CheckExistData(stories.dataValues.ID)) {
                    var speakingUrl = SpeakingUrlService(stories.dataValues.Title) +
                        '-' + HashIDService.Create(stories.dataValues.ID);
                    Stories.update({
                            SpeakingUrl: speakingUrl
                        }, {
                            where: {
                                ID: stories.dataValues.ID
                            },
                            transaction: options.transaction
                        })
                        .then(function(speakingUrlUpdated) {
                            callback();
                        }, function(err) {
                            callback(err);
                        });
                }
            }
        }
    }
};
