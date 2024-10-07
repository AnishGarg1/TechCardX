const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    token: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
        required: true,
    },
    codingProfiles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodingProfile",
    },
});

// Creating index for username to implement faster search for a document in db with username
userSchema.index({ username: 1 },  { unique: true });

module.exports = mongoose.model("User", userSchema);