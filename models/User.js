const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide a name'],
    },
    email: {
        type: String,
        required: [true, 'You must provide a email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'You must provide a password'],

    },
});

module.exports = mongoose.model('User', userSchema);