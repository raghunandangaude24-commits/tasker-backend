const express = require("express");

const router = express.Router();

const User = require("../models/User");

const auth = require("../middleware/auth.middleware");


/* ================= GET USER SETTINGS ================= */

router.get("/settings", auth, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


/* ================= UPDATE USER SETTINGS ================= */

router.put("/settings", auth, async (req, res) => {

    try {

        const {

            name,
            email,
            password,
            emailNotifications,
            taskReminders

        } = req.body;


        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        user.name = name ?? user.name;

        user.email = email ?? user.email;

        user.emailNotifications =
            emailNotifications ?? user.emailNotifications;

        user.taskReminders =
            taskReminders ?? user.taskReminders;


        if (password && password.trim() !== "") {

            const bcrypt = require("bcryptjs");

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.json({
            message: "Settings updated successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;