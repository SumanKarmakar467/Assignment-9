const express = require('express');
const dotenv = require('dotenv');
const connectDb = require("./config/db");

dotenv.config();

const app=express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/",(req, res) => {
    res.send("This is a Visitor Pass Management System Testing");
});

const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    });
};

startServer();
