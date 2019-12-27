const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const workerScheme = new Schema({
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
            match: '^\\+\\d{2}\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$'
        },
        email: {
            type: String,
            default: 'Not available',
            match: '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'
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

export const loginSchema = new Schema({
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
        match: '/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/'
    },
    email: {
        type: String,
        default: 'Not available',
        match: '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'
    }
}, {versionKey: false});