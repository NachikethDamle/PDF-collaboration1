
const mongoose = require('mongoose');
const pdfSchema = new mongoose.Schema({
  name: String,
  filePath: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sharedWith: [String],
  comments: [{
    email: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
  }]
});
module.exports = mongoose.model('PDF', pdfSchema);
