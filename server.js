require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();


/* ================= DATABASE ================= */

connectDB();


/* ================= MIDDLEWARE ================= */

// JSON Parser
app.use(express.json());


// CORS
app.use(

    cors({

        origin: "*",

        methods: [

            "GET",
            "POST",
            "PUT",
            "DELETE"

        ],

        credentials: true
    })
);


/* ================= ROUTES ================= */

// AUTH ROUTES
app.use(

    "/api/auth",

    require("./routes/auth.routes")
);


// TASK ROUTES
app.use(

    "/api/tasks",

    require("./routes/task.routes")
);


// USER SETTINGS ROUTES
app.use(

    "/api/user",

    require("./routes/user.routes")
);


/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {

    res.send("Task API Running 🚀");

});


/* ================= 404 HANDLER ================= */

app.use((req, res) => {

    res.status(404).json({

        message: "Route not found"

    });

});


/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {

    console.log(err.stack);

    res.status(500).json({

        message: "Server Error"

    });

});


/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(`Server running on port ${PORT}`);

});