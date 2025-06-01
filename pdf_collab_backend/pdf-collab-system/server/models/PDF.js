// models/PDF.js
const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  name: String,
  fileId: mongoose.Schema.Types.ObjectId,  // GridFS file id
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sharedWith: { type: [String], default: [] },
  comments: [
    {
      email: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('PDF', pdfSchema);
