var Article = require('../models/article.server.model');

Article.find({},function(err,docs){
    if(err){
        console.log(err);
        return;
    }
    console.log(docs);
});
