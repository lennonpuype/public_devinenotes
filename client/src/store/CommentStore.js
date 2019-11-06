import { decorate, configure, observable, action, runInAction } from "mobx";

import Comment from "../models/Comment.js";
import Api from "../api/Api.jsx";

configure({ enforceActions: "observed" });

class CommentStore {
  comments = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.apiComments = new Api(`comments`);
  }

  //comments
  getComments = () => {
    this.comments = [];
    this.apiComments.getAll().then(comments => this.saveComments(comments));
  };

  saveComments = comments => {
    comments.forEach(allComments => {
      this.comments.push(allComments);
    });
  };

  addComment = data => {
    let newComment = new Comment();
    newComment.updateFromServer(data);
    this.comments.push(newComment);
    this.apiComments
      .create(newComment)
      .then(noteValues => newComment.updateFromServer(noteValues));
  };

  _addComment = values => {
    const comment = new Comment();
    comment.updateFromServer(values);
    runInAction(() => this.comments.push(comment));
  };
}

decorate(CommentStore, {
  comments: observable,
  addComment: action,
  getComments: action,
  saveComments: action
});

export default CommentStore;
