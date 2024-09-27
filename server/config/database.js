const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {console.log("Database connected successfully")})
    .catch((error) => {
        console.log("Error:", error);
        console.log("Database connection failed");
        process.exit(1);
    });
}