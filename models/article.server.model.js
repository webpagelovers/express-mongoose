var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project1');
var articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    createTime:Date
});
articleSchema.index({title:1});
module.exports = mongoose.model('Article',articleSchema);