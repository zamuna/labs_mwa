var express = require('express');
var router = express.Router();
var fs = require('fs');



router.get('/', function (req, res, next) {
    res.render('newsletter', { title: 'Newsletters' });
    // res.end();
});
router.post('/', function (req, res, next) {
    req.assert('email', 'A valid email is required').notEmpty().isEmail();
    var errors = req.validationErrors();
    console.log(errors);
    if (!errors) {
        var email = req.body.email;
        fs.appendFileSync('./views/subscriber.txt', "\n " + email, function (err) {
            if (err) {
                res.write(err);
                res.write("\n");
            }
        });
        res.render('thankyou', { email });
    }

    else {
        res.render('error', { error: errors });
    }

});
module.exports = router;