var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name: {type:String, required:true},
    userId: {type:String, required:true},
    imagePath: {type:String, required:true},
    ingredients: {type:String, required:true},
    instructions: {type:String, required:true},
    category: {type:String, required:true},
    savedBy: Array,
    saves: Number
});

module.exports = mongoose.model('posts', imageSchema);