const mongoose = require('mongoose');
const Schema = mongooseSchema;

const movieSchema = new Schema({

    name: String,
    genre: String,
    authorId: String
});

module.exports= mongoose.model('Book', movieSchema)