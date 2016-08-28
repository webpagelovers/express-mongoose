var router = require('express').Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Article = require('../models/article.server.model');

router.get('/articles/:index',function(req,res){
    var index = req.params.index;
    Article.findOne({_id:index},function(err,doc){
        if(err){
            console.log(err);
            return;
        };
        if(doc){
            res.render('articles',{title:'articles',article:doc});
        }
    });
});
module.exports = router;