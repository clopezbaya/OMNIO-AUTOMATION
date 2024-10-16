const Results = require('../../db/models/testResult');

exports.getResults = async (req, res) => {
  try {
    const results = await Results.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
