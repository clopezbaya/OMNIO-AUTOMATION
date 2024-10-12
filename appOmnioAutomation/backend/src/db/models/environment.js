const mongoose = require('mongoose');

const EnvironmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestResult' }],
});

module.exports = mongoose.model('Environment', EnvironmentSchema);
