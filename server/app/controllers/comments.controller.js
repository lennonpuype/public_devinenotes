const Comment = require("../models/comment.model.js");

exports.create = (req, res) => {
  if (!req.body.comment) {
    return res.status(500).send({ err: "comment can not be empty" });
  }

  const comment = new Comment({
    noteId: req.body.noteId,
    comment: req.body.comment,
    user: req.body.user
  });

  comment
    .save()
    .then(comment => res.send(comment))
    .catch(err => {
      res.status(500).send({ error: err.comment || "Error" });
    });
};

exports.findAll = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.send(comments);
  } catch (err) {
    res.status(500).send({ err: err.comment || "Error" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId
    });
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send("No comment found");
    }
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(500).send("Geen geldig ID");
    }
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  if (!req.body.comment) {
    return res.status(400).send("comment mag niet leeg zijn");
  }

  try {
    const comment = await Comment.findOneAndUpdate(
      {
        _id: req.params.commentId
      },
      {
        noteId: req.body.noteId,
        comment: req.body.comment,
        user: req.body.user
      },
      {
        new: true
      }
    );

    if (!comment) {
      return res.status(404).send("No comment found");
    }
    res.send(comment);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(417).send("Geen geldig ID");
    }
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const comment = await Comment.findOneAndRemove({
      _id: req.params.commentId
    });
    if (!comment) {
      return res.status(404).send("No comment found");
    }
    res.send(comment);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(417).send("Geen geldig ID");
    }
    return res.status(500).send(err);
  }
};
