const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const PhotoSchema = new Schema({
    title : { 
        type: String, 
    },
    sharemode: {
        type: Number,
        defaut: 1
    },
    image: { 
        type: String, 
    },
    description: {
        type: String,
    },
    userId: {
        type:  ObjectId,
        default: '63a481a7f006f5fbcfcd398a'
    },
    flagDeleted: {
        type: Number,
        default: 1
    },
    flagActived: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Photo', PhotoSchema);