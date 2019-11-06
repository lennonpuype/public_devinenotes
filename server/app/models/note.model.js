const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    color: String,
    user: Object,
    userId: String,
    privacy: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', NoteSchema);
