const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  testType: { type: String, required: true },
  result: { type: Object, required: true },
  date: { type: Date, default: Date.now },
  environment: { type: mongoose.Schema.Types.ObjectId, ref: 'Environment' },
});

module.exports = mongoose.model('TestResult', TestResultSchema);
