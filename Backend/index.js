const express = require('express');
const dotenv = require('dotenv');
const connectDb = require("./config/db");
const passRoutes = require("./routes/passRoutes");
const cors = require("cors");



dotenv.config();

const app=express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/",(req, res) => {
    res.send("This is a Visitor Pass Management System Testing");
});
app.use("/api", passRoutes);

const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    });
};

startServer();
