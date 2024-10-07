const mongoose = require("mongoose");

const leetcodeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
        required: true,
    }
}, { timestamps:true });

module.exports = mongoose.model("LeetCode", leetcodeSchema);