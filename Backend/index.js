const express = require('express');
const dotenv = require('dotenv');
const connectDb = require("./config/db");
const passRoutes = require("./routes/passRoutes");
const cors = require("cors");



dotenv.config();

const app=express();
const allowedOrigins = [
    "http://localhost:5173",
    "https://assignment-9-kappa-seven.vercel.app",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials:true,
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

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
