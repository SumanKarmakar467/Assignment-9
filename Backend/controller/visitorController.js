const Visitor = require("../model/Visitor");

// Create Visitor
exports.createVisitor = async (req, res) => {
  try {
    const { name, email, purpose, date } = req.body;

    if (!name || !email || !purpose || !date || !req.file) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const visitor = await Visitor.create({
      name,
      email,
      purpose,
      date,
      image: req.file.filename,
      status: "Pending",
    });

    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all visitors
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Visitor can check appointment by email
exports.getVisitorByEmail = async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ email: req.params.email }).sort({
      createdAt: -1,
    });

    if (!visitor) {
      return res.status(404).json({ message: "No appointment found" });
    }

    res.status(200).json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employee can approve or reject visitor appointment
exports.updateVisitorStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be Approved or Rejected" });
    }

    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.status(200).json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helpdesk can mark check in
exports.checkInVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    if (visitor.status !== "Approved") {
      return res.status(400).json({ message: "Only approved visitors can check in" });
    }

    visitor.checkInTime = new Date();
    await visitor.save();

    res.status(200).json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helpdesk can mark check out
exports.checkOutVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    if (!visitor.checkInTime) {
      return res.status(400).json({ message: "Visitor is not checked in yet" });
    }

    visitor.checkOutTime = new Date();
    await visitor.save();

    res.status(200).json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin can delete visitor data
exports.deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
