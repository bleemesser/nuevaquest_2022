const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    p1name: {
        type: String,
        required: true
    },
    p2name: {
        type: String,
        required: true
    },
    p1points: {
        type: String,
        required: true
    },
    p2points: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('gamemodel', gameSchema);