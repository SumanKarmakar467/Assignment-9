const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const { createVisitor } = require("../controller/visitorController");

router.post("/",upload.single("image"),  createVisitor);

module.exports = router;