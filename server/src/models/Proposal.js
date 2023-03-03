const mongoose = require("mongoose");

const Proposal = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true,
        trim: true
    },
    vendorEmail: {
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
        default: "This is some dummy data",
        trim: true
    },
    foodPreferences: {
        type: String,
        default: "Mutter Paneer, IceCream, Chole Bhature, Veg Biryani",
        trim: true
    },
    eventImage: {
        type:String,
        required:true
    },
    venueImage:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model("proposals", Proposal);