const mongoose = require("mongoose");
require('dotenv').config();

const cardSchema = new mongoose.Schema({
        prompt: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const cardModel = mongoose.model("Card", cardSchema);
module.exports = cardModel;