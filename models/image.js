var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name: {type:String, required:true},
    userId: {type:String, required:true},
    imagePath: {type:String, required:true},
    recipe: {type:String, required:true},
    category: {type:String, required:true}
});

module.exports = mongoose.model('posts', imageSchema);