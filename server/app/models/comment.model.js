const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    noteId: String,
    comment: String,
    user: Object
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Comment', CommentSchema);
