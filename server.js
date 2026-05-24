require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* ---------------- DATABASE CONNECTION ---------------- */
connectDB();

/* ---------------- MIDDLEWARE ---------------- */

// JSON parser
app.use(express.json());

// CORS (safe for production — update frontend URL later)
app.use(
    cors({
        origin: "*", // change this to your frontend URL in production
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

/* ---------------- ROUTES ---------------- */

// AUTH ROUTES
app.use("/api/auth", require("./routes/auth.routes"));

// TASK ROUTES
app.use("/api/tasks", require("./routes/task.routes"));

/* ---------------- TEST ROUTE ---------------- */

app.get("/", (req, res) => {
    res.send("Task API Running 🚀");
});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});