const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth.middleware");


/* ================= CREATE TASK ================= */

router.post("/", auth, async (req, res) => {

    try {

        const {
            title,
            description,
            dueDate,
            priority
        } = req.body;

        const task = new Task({

            userId: req.user.id,

            title,

            description,

            dueDate,

            priority

        });

        await task.save();

        res.status(201).json(task);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});


/* ================= GET ALL TASKS ================= */

router.get("/", auth, async (req, res) => {

    try {

        const tasks = await Task.find({
            userId: req.user.id
        }).sort({
            createdAt: -1
        });

        res.json(tasks);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});


/* ================= UPDATE TASK ================= */

router.put("/:id", auth, async (req, res) => {

    try {

        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.title = req.body.title ?? task.title;

        task.description = req.body.description ?? task.description;

        task.priority = req.body.priority ?? task.priority;

        task.dueDate = req.body.dueDate ?? task.dueDate;

        task.completed = req.body.completed ?? task.completed;

        await task.save();

        res.json(task);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});


/* ================= DELETE TASK ================= */

router.delete("/:id", auth, async (req, res) => {

    try {

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});

module.exports = router;