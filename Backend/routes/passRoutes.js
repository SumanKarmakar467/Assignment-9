const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createVisitor,
  getVisitors,
  getVisitorByEmail,
  updateVisitorStatus,
  checkInVisitor,
  checkOutVisitor,
  deleteVisitor,
} = require("../controller/visitorController");

// Visitor
router.post("/visitors",upload.single("image"),  createVisitor);
router.get("/visitors/check/:email", getVisitorByEmail);

// Employee
router.get("/employee", getVisitors);
router.patch("/employee/:id/status", updateVisitorStatus);

// Helpdesk
router.get("/helpdesk", getVisitors);
router.patch("/helpdesk/:id/checkin", checkInVisitor);
router.patch("/helpdesk/:id/checkout", checkOutVisitor);

// Admin
router.get("/admin", getVisitors);
router.delete("/admin/:id", deleteVisitor);

module.exports = router;
