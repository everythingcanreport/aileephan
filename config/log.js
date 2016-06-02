var winston = require('winston');
var fs = require('fs');
if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}
require('events').EventEmitter;
var Mail = require('winston-mail').Mail;
var fs = require('fs');
if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}
var config = {
    levels: {
        silly: 0,
        verbose: 1,
        info: 2,
        data: 3,
        warn: 4,
        debug: 5,
        error: 6
    },
    colors: {
        silly: 'magenta',
        verbose: 'cyan',
        info: 'green',
        data: 'grey',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    }
};
var customLogger = new winston.Logger({
    transports: [
        //log information server
        new winston.transports.Console({
            level: 'debug'
        }),
        //transports history server via day
        new winston.transports.DailyRotateFile({
            silent: false,
            colorize: true,
            timestamp: true,
            json: true,
            prettyPrint: true,
            showLevel: true,
            formatter: true,
            filename: './logs/log'
        })
    ],
    levels: config.levels,
    colors: config.colors
});

customLogger.add(Mail, {
    host: "smtp.gmail.com",
    port: 465,
    ssl: true,
    username: 'hotro.ailee.phan@gmail.com',
    password: 'thanh1101681',
    subject: 'Debug Production 3005',
    from: 'Ailee Phan Production <hotro.ailee.phan@gmail.com>',
    to: 'Thanh Dev <thanh.dev.node@gmail.com>',
    level: 'error'
});
var log = {};
if (process.env.NODE_ENV === 'production') {
    log['custom'] = customLogger;
} else {
    // log['level'] = 'verbose';
    log['custom'] = customLogger;
}
module.exports.log = log;
