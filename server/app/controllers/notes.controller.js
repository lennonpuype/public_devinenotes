const Note = require('../models/note.model.js');

exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(500).send({err: 'title can not be empty'});
  }

  const note = new Note({
    title: req.body.title,
    description: req.body.description,
    color: req.body.color,
    user: req.body.user,
    userId: req.body.userId,
    privacy: req.body.privacy
  });

  note
    .save()
    .then(note => res.send(note))
    .catch(err => {
      res.status(500).send({error: err.note || 'Error'});
    });
};

exports.findAll = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: - 1});
    res.send(notes);
  } catch (err) {
    res.status(500).send({err: err.note || 'Error'});
  }
};

exports.findOne = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.noteId
    });
    if (note) {
      res.send(note);
    } else {
      res.status(404).send('No note found');
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send('title mag niet leeg zijn');
  }

  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.noteId
      },
      {
        title: req.body.title,
        description: req.body.description,
        color: req.body.color,
        user: req.body.user,
        userId: req.body.userId,
        privacy: req.body.privacy
      },
      {
        new: true
      }
    );

    if (!note) {
      return res.status(404).send('No note found');
    }
    res.send(note);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(417).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const note = await Note.findOneAndRemove({
      _id: req.params.noteId
    });
    if (!note) {
      return res.status(404).send('No note found');
    }
    res.send(note);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(417).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};
