const mongoose = require("mongoose");
const { sendMail } = require("../utils/mailSender");

const TokenSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 10, // The document will be deleted after creation of 10 minutes
    }
});

// A function to send mail
const sendVerificationEmail = async (email, token) => {
    try {
        const mailResponse = await sendMail(
            email,
            "Verification Email from TechCardX",
            `
                <h1>Email Verification</h1>
                <button> Click Here </button>
                <p>Or</p>
                <p>Open this link your browser: ${token}</p>
            `
        );
        console.log("Mail sent successfully", mailResponse);
        return mailResponse;
    } catch (error) {
        console.log("Error occured while sending mail. Error:", error);
        throw error;
    }
}

// Function to send token before saving document to db
TokenSchema.pre("save", async (next) => {
    console.log("New document saved to database");

    // Only send an email when a new document is created
    if(this.isNew){
        await sendVerificationEmail(this.email, this.token);
    }
    next();
});

module.exports = mongoose.model("Token", TokenSchema);