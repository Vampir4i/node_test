const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    info: {
        phone: {
            type: String,
            default: 'Not available',
            //match: '^\\+\\d{2}\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$'
        },
        email: {
            type: String,
            default: 'Not available',
            //match: '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'
        }
    },
    data: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = mongoose.model('Worker', workerSchema);