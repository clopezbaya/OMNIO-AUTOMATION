const Results = require('../../db/models/testResult');
const mongoose = require('mongoose');

exports.getResults = async (req, res) => {
  try {
    const results = await Results.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResultsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Results.findById(id);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResults = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Results.findByIdAndDelete(id);
    if (!report) {
      return res
        .status(404)
        .json({ message: `Cannot find the report with ID ${id}` });
    }
    res.status(200).json({ message: `Report deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
