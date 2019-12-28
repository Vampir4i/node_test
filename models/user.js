const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        //match: '/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/'
    },
    email: {
        type: String,
        default: 'Not available',
        //match: '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'
    }
}, {versionKey: false});

module.exports = mongoose.model('User', userSchema);