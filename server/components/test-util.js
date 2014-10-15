/**
 * Created by shai on 10/9/14.
 */
var superagent = require('superagent');
var agent = superagent.agent();

// Logs in as a user and returns their authorization token
exports.loginUser = function(request, account, done){
    request
        .post('/auth/local')
        .send(account)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            done(res.body.token);
        });
}