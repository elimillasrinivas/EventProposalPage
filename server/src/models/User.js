const mongoose = require("mongoose");

const User = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    select: {
        type: String,
        trim: true,
        default:""        //added default value as empty string..
    }
})

module.exports = mongoose.model("User", User);     //we should keep collection name starting with capital ans must not be a prural..users=>User