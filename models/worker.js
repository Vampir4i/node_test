const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
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
        type: String,
        default: 'Not available'
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
workerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Worker', workerSchema);