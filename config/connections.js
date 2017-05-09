module.exports.connections = {
    disk: {
        module: 'sails-disk'
    },
    mysql: {
        adapter: 'sails-mysql',
        port: 3306,
        user: 'root',
        password: 'ailee@c04LpC',
        // password: 'meditekdb123456',
        database: 'Ailee',
        charset: 'utf8',
        collation: 'utf8-general_ci',
        options: {
            host: 'localhost'
        }
    }
};
