module.exports = app => {
  const controller = require('../controllers/notes.controller.js');
  app.post('/api/notes', controller.create);
  app.get('/api/notes', controller.findAll);
  app.get('/api/notes/:noteId', controller.findOne);
  app.put('/api/notes/:noteId', controller.update);
  app.delete('/api/notes/:noteId', controller.delete);
};
