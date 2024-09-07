const expres = require("express");
const app = expres();
const dotenv = require("dotenv");
const database = require("./config/database");

// Configuration
dotenv.config();
// Connect to database
database();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
});