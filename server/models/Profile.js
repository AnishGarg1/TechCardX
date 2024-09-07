const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userImg: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNo: {
        type: Number,
        trim: true, 
    },
});

module.exports = mongoose.model("Profile", profileSchema);