var Article = require('../models/article.server.model');

var article = new Article({
    title:'lll',
    content:'cccc',
    createTime:Date.now()
});

article.save(function(err,doc){
    if(err){
        console.log(err);
        return;
    }
    console.log(doc);
});