const Visitor = require("../model/visitor");

const createVisitor = async (req, res) => {
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
    });

    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createVisitor };