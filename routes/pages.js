var router = require('express').Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Article = require('../models/article.server.model');

router.get('/',function(req,res,next){
    Article.count({},function(err,count){
        if(err){
            console.log(err);
            return;
        };
        if(count){
            var allPage = count;
            var currentPage = req.query.page;
            var pages = [];
            if(allPage <= 10){
                for(var i=0;i<allPage;i++){
                    pages.push(i);
                }
            }/*else{
                for(){

                }
            }*/
            console.log(pages);
            next();
        }
    });
});

module.exports = router;






























/*
 var pages = {
 pageCount:0,
 pageCurrent:0,
 pagePrev:0,
 pageNext:0
 };

Article.count({},function(err,pageCount){
    if(err){
        console.log(err);
        return;
    };
    if(pageCount){
        var pageCount = pageCount;
            pageCurrent = Math.floor(pageCount/10);
            pagePrev = pageCurrent-1;
            pageNext = pageCurrent+1;

        pages = {
            pageCount:pageCount,
            pageCurrent:pageCurrent,
            pagePrev:pagePrev < 1 ? pagePrev =  1 : pagePrev = pagePrev,
            pageNext:pageNext
        };
        console.log(pages);
    };
});*/
