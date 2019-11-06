import NoteStore from "./NoteStore";
import UserStore from "./UserStore";
import CommentStore from "./CommentStore";

class Store {
  constructor() {
    this.userStore = new UserStore(this);
    this.noteStore = new NoteStore(this);
    this.commentStore = new CommentStore(this);
  }
}

export default new Store();
