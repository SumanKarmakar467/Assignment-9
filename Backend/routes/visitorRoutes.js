const express = require('express');
const router = express.Router();

const { createVisitor } = require("../controller/visitorController");

router.post("/", createVisitor);

module.exports = router;