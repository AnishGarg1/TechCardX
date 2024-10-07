const expres = require("express");
const app = expres();
const dotenv = require("dotenv");
const database = require("./config/database");
const cors = require("cors");
const userRoutes = require("./routes/User");
const codingProfileRoutes = require("./routes/CodingProfiles");

// configuration
dotenv.config();

// middleware
app.use(expres.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// Connect to database
database.connect();

// Routing
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/coding-profile", codingProfileRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
});