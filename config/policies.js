var _ = require('lodash');
var policies = {
    '*': 'isAdmin'
};
var policiesCustom = require('./policies/policies');
_.extend(policies, policiesCustom);
module.exports.policies = policies;
