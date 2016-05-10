module.exports = {
    associations: function() {
        //association Stories - FileUpload
        Stories.belongsToMany(FileUpload, {
            through: 'RelStoriesFileUpload',
            foreignKey: 'StoriesID'
        });
        FileUpload.belongsToMany(Stories, {
            through: 'RelStoriesFileUpload',
            foreignKey: 'FileUploadID'
        });
    }
};
