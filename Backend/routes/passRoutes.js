const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const { createVisitor, getVisitors } = require("../controller/visitorController");

// Visitors 
router.post("/visitors",upload.single("image"),  createVisitor);

// Employee
router.get("/employee", getVisitors)

module.exports = router;