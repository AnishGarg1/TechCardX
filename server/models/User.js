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
    passWord: {
        type: String,
        required: true,
        trim: true,
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profle",
        required: true,
    },
    token: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
        required: true,
    }
});

module.exports = mongoose.model("User", userSchema);