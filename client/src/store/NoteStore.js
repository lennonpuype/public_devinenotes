import { decorate, configure, observable, action, runInAction } from "mobx";
import Note from "../models/Note.js";
import Api from "../api/Api.jsx";

configure({ enforceActions: "observed" });

class NoteStore {
  notes = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.apiNotes = new Api(`notes`);
    this.getAll();
  }

  //Notes
  getAll = () => {
    this.note = this.apiNotes.getAll().then(d => d.forEach(this._addNote));
  };

  addNote = data => {
    let newNote = new Note();
    newNote.updateFromServer(data);
    this.notes.push(newNote);
    this.apiNotes
      .create(newNote)
      .then(noteValues => newNote.updateFromServer(noteValues));
  };

  _addNote = values => {
    const note = new Note();
    note.updateFromServer(values);
    runInAction(() => this.notes.push(note));
  };

  updateNote = note => {
    this.apiNotes
      .update(note)
      .then(noteValues => note.updateFromServer(noteValues));
  };

  deleteNote = note => {
    this.notes.remove(note);
    this.apiNotes.delete(note);
  };

  saveNote = value => {
    let i = 0;
    this.notes.forEach(note => {
      if (note.id === value.id) i++;
    });
    if (i === 0 && value.id !== undefined) this.notes.push(value);
  };

  getNote = id => {
    this.apiNotes.findOne(id).then(note => this.saveNote(note));
  };

  //
}

decorate(NoteStore, {
  notes: observable,
  addNote: action,
  getNote: action,
  currentNote: observable,
  deleteNote: action
});

export default NoteStore;
