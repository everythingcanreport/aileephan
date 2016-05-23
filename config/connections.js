module.exports.connections = {
    disk: {
        module: 'sails-disk'
    },
    mysql: {
        adapter: 'sails-mysql',
        port: 3306,
        user: 'root',
        password: 'tamran1101681',
        // password: 'meditekdb123456',
        database: 'Ailee',
        charset: 'utf8',
        collation: 'utf8-general_ci',
        options: {
            host: 'localhost'
        }
    }
};