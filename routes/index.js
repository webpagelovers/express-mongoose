var router = require('express').Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var login = require('./login');

var Article = require('../models/article.server.model');

var articles = require('./articles');
var pages = require('./pages');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(session({
    store:new FileStore(),
    secret:'keyboard cat',
    cookie:{maxAge:1000 * 60 * 60 * 24 * 7}
}));

router.get('/login',login);
router.post('/login',login);
router.get('/articles/:index',articles);
router.get('/',pages);
router.post('/SignOut',function(req,res){
    req.session.logined = false;
    res.redirect('/');
});
router.post('/add',function(req,res){
    var title = req.body.title;
    var content = req.body.content;
    var article = new Article({
        title:title,
        content:content,
        createTime:Date.now()
    });
    console.log(article)

    article.save(function(err,doc){
        if(err){
            console.log(err);
            return;
        };
    });
    if(title !== '' && content !== ''){
        res.redirect('/');
    }
});
router.get('/get/:index',function(req,res){
    var index = req.params.index;
    Article.findOne({_id:index},function(err,doc){
        if(err){
            console.log(err);
            return;
        };
        if(doc){
            res.send(doc);
        }
    });
});
router.get('/del',function(req,res){
    var index = req.query.index;
    Article.findOne({_id:index},function(err,doc){
        if(err){
            console.log(err);
            return;
        };
        if(doc){
            doc.remove();
        }
    });
    res.redirect('/');
});
router.post('/update',function(req,res){
    var index = req.body.index;
    var title = req.body.title;
    var content = req.body.content;

    Article.findOne({_id:index},function(err,doc){
        if(err){
            console.log(err);
            return;
        };
        if(doc){
            Article.update({_id:index},{$set:{title:title,content:content}},function(err){
                if(err){
                    console.log(err);
                }
            });
        };
    });
    res.redirect('/');
});
router.get('/',function(req,res){
    var logined = req.session.logined;
    Article.find({}).sort({_id:-1}).limit(10).exec(function(err,docs){
        if(err){
            console.log(err);
            return;
        };
        if(docs){
            res.render('index', {list: docs, title: 'index',logined:logined});
        };
    });
});




























module.exports = router;