const mongoose = require("mongoose");

const codingProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    leetcode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LeetCode",
    },
    geeksforgeeks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GeeksForGeeks",
    },
    interviewbit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewBit",
    },
    codestudio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeStudio",
    },
    codechef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeChef",
    },
});

module.exports = mongoose.model("CodingProfile", codingProfileSchema);