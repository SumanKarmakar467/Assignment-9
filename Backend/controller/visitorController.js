const Visitor = require("../model/visitor");

// Create Visitors 
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
      // image: req.file.filename,
    });

    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Visitors By Employee
exports.getVisitors = async (req, res) => {
  const visitor = await Visitor.find();

  if(!visitor){
    res.status(400).json({error: "No Such Visitors"})
  }
  res.status(200).json(visitor);
}  
