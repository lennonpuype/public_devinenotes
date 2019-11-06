import uuid from "uuid";
import { Component } from "react";
import { decorate, observable, action, computed } from "mobx";

class Comment extends Component {
  constructor(noteId, comment, user) {
    super();
    this.id = uuid.v4();
    this.comment = comment;
    this.noteId = noteId;
    this.user = user;
  }

  setId = value => (this.id = value);
  setComment = value => (this.comment = value);
  setNoteId = value => (this.noteId = value);
  setUser = value => (this.user = value);

  updateFromServer = values => {
    this.setId(values._id);
    this.setComment(values.comment);
    this.setNoteId(values.noteId);
    this.setUser(values.user);
  };

  get values() {
    return {
      comment: this.comment,
      noteId: this.noteId,
      user: this.user
    };
  }
}

decorate(Comment, {
  id: observable,
  noteId: observable,
  comment: observable,
  updateFromServer: action,
  setId: action,
  setComment: action,
  setNoteId: action,
  values: computed,
  user: observable
});

export default Comment;
