import uuid from "uuid";
import { Component } from "react";
import { decorate, observable, action, computed } from "mobx";

class Note extends Component {
  constructor(title, description, color, user, userId, privacy) {
    super();
    this.id = uuid.v4();
    this.noteId = this.id;
    this.title = title;
    this.description = description;
    this.time = Date.now();
    this.color = color;
    this.user = user;
    this.userId = userId;
    this.privacy = privacy;
  }

  setId = value => (this.id = value);
  setNoteId = value => (this.noteId = value);
  setTitle = value => (this.title = value);
  setDescription = value => (this.description = value);
  setColor = value => (this.color = value);
  setUser = value => (this.user = value);
  setUserId = value => (this.userId = value);
  setPrivacy = value => (this.privacy = value);

  updateFromServer = values => {
    this.setId(values._id);
    this.setNoteId(values.noteId);
    this.setTitle(values.title);
    this.setDescription(values.description);
    this.setColor(values.color);
    this.setUser(values.user);
    this.setUserId(values.userId);
    this.setPrivacy(values.privacy);
  };

  get values() {
    return {
      noteId: this.noteId,
      title: this.title,
      description: this.description,
      color: this.color,
      user: this.user,
      userId: this.userId,
      privacy: this.privacy
    };
  }
}

decorate(Note, {
  id: observable,
  noteId: observable,
  title: observable,
  time: observable,
  userId: observable,
  description: observable,
  color: observable,
  setTitle: action,
  setDescription: action,
  setColor: action,
  updateFromServer: action,
  values: computed,
  privacy: observable
});

export default Note;
