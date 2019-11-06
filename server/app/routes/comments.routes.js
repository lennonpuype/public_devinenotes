module.exports = app => {
  const controller = require("../controllers/comments.controller.js");
  app.post("/api/comments", controller.create);
  app.get("/api/comments", controller.findAll);
};
