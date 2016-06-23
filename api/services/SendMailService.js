var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
var templateDirs = path.resolve(__dirname, 'TemplateEmail');
var emailTemplates = require('email-templates');
var emailAddressRequiredError = new Error('email address required');
var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hotro.ailee.phan@gmail.com',
        pass: 'thanh1101681'
    }
});

module.exports = function(templateName, emailInfo, fn) {
    if (!emailInfo.email) {
        return fn(emailAddressRequiredError);
    }

    if (!emailInfo.subject) {
        return fn(emailAddressRequiredError);
    }

    emailTemplates(templateDirs, function(err, template) {
        if (err) {
            return fn(err);
        }
        template(templateName, emailInfo, function(err, html, text) {
            if (err) {
                return fn(err);
            }
            transport.sendMail({
                from: emailInfo.from,
                to: emailInfo.email,
                subject: emailInfo.subject,
                html: html,
                text: text
            }, function(err, responseStatus) {
                if (err) {
                    return fn(err);
                }
                return fn(null, responseStatus.message, html, text);
            });
        });
    });
};
