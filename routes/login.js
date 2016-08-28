var router = require('express').Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(session({
    store:new FileStore(),
    secret:'keyboard cat',
    cookie:{maxAge:1000 * 60 * 60 * 24 * 7}
}));

router.get('/login',function(req,res){
    res.render('login', { title: 'login'});
});
router.post('/login',function(req,res,next){
    var loginname = req.body.loginname;
    var password = req.body.password;
    if(loginname === 'lizhihong' && password === '111111'){
        req.session.logined = true;
        res.redirect('/');
    }else{
        req.session.logined = false;
        res.redirect('/login');
    }
});
module.exports = router;