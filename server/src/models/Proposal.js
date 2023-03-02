const mongoose = require("mongoose");

const Proposal = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true,
        trim: true
    },
    vendorId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    place: {
        type: String,
        required: true,
        trim: true
    },
    eventType: {
        type: String,
        required: true,
        trim: true
    },
    proposalType: {
        type: String,
        required: true,
        trim: true
    },
    budget: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true,
        trim: true
    },
    to: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    events: {
        type: String,
        required: true,
        trim: true
    },
    foodPreferences: {
        type: String,
        required: true,
        trim: true
    },
    eventImage: {
        type:String,
    },
    venueImage:{
        type:Array
    }
})

module.exports = mongoose.model("proposals", Proposal);