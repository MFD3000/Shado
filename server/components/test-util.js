/**
 * Created by shai on 10/9/14.
 */
var superagent = require('superagent');
var agent = superagent.agent();

exports.loginUser = function(request, account, done){
    request
        .post('/login')
        .send(account)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            agent.saveCookies(res);
            done(agent);
        });
}