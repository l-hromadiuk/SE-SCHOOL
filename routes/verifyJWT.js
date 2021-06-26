const jwt = require('jsonwebtoken');

module.exports=function verify(req, res, next) {
    const jToken = req.header('login-token')
        ;
    if (!jToken) { return res.status(401).send('Sorry! Access prohibited'); }


    try {
        const checked = jwt.verify(jToken, process.env.TOKEN);
        req.user = checked;
        next();

    } catch (err) {

        res.status(400).send('Your token is invalid');

    }
}