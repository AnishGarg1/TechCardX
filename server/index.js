const expres = require("express");
const app = expres();

app.listen(4000, (req, res) => {
    console.log("Server Connnected");
})