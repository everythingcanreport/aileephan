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
        StoriesID: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'Must be an integer!'
                }
            },
            references: {
                model: 'Stories',
                key: 'ID'
            }
        },
        FileUploadID: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'Must be an integer!'
                }
            },
            references: {
                model: 'FileUpload',
                key: 'ID'
            }
        }
    },
    associations: function() {},
    options: {
        freezeTableName: true,
        timestamps: false,
        hooks: {}
    }
};
