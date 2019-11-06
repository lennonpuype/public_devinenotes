import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import styles from "../styles/Notes.module.css";
import addNote from "../styles/AddNote.module.css";
import PublicNotes from "./PublicNotes.jsx";

class AddNote extends Component {
  constructor({ noteStore, userStore }) {
    super();
    this.currentUser = userStore.authUser;

    this.publicNotes = {};

    this.noteStore = noteStore;
    this.notes = this.noteStore.notes;
    this.titleRef = React.createRef();
    this.descRef = React.createRef();

    this.colors = ["pink", "green", "blue", "orange"];
    this.randomIndex = Math.floor(Math.random() * this.colors.length);
    this.color = this.colors[this.randomIndex];

    this.state = {
      redirect: false,
      private: false
    };

    this.privacy = `public`;
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  handleSubmitNote = e => {
    e.preventDefault();

    if (this.titleRef.current.value) {
      this.setRedirect();
      const currentTitle = this.titleRef.current.value;
      const currentDesc = this.descRef.current.value;
      this.noteStore.addNote({
        title: currentTitle,
        description: currentDesc,
        color: this.color,
        user: this.currentUser,
        userId: this.currentUser._id,
        privacy: this.privacy
      });

      this.titleRef.current.value = ``;
      this.descRef.current.value = ``;
    }
  };

  handleOnChange = e => {
    this.privacy = e.currentTarget.value;
  };

  render() {
    if (
      this.noteStore.notes.filter(note => note.privacy === `public`) !==
      undefined
    )
      this.publicNotes = this.noteStore.notes.filter(
        note => note.privacy === `public`
      );
    return (
      <>
        <ul className={styles.ul}>
          <li
            className={`${addNote.li} ${styles[`add_` + this.color]} add_note`}
          >
            <form onSubmit={this.handleSubmitNote} className={addNote.form}>
              <div className={addNote.privacy_section}>
                <input
                  type="radio"
                  id="private"
                  name="privacy"
                  value="private"
                  onChange={e => this.handleOnChange(e)}
                />
                <label
                  htmlFor="private"
                  className={addNote[`label_` + this.color]}
                >
                  Private
                </label>

                <input
                  type="radio"
                  id="public"
                  name="privacy"
                  value="public"
                  defaultChecked
                  onChange={e => this.handleOnChange(e)}
                />
                <label
                  htmlFor="public"
                  className={addNote[`label_` + this.color]}
                >
                  Public
                </label>
              </div>
              <label htmlFor="title" className={addNote.title_label}>
                Title
              </label>
              <input
                type="text"
                className={`${addNote.title_input} ${
                  addNote[this.color + `_border`]
                } inputfield_small`}
                ref={this.titleRef}
                autoFocus
                id="title"
                name="title"
                required
              />
              <label htmlFor="description" className={addNote.desc_label}>
                Description
              </label>
              <input
                type="text"
                className={`${addNote.desc_input} ${
                  addNote[this.color + `_border`]
                } inputfield_small`}
                ref={this.descRef}
                id="description"
                name="description"
                required
              />
              {this.renderRedirect()}
              <button
                className={`${addNote.post} ${addNote[this.color + `_bg`]}`}
              >
                Post-it
              </button>
              <Link to="/" className={addNote.cancel}>
                Cancel
              </Link>
            </form>
          </li>

          <PublicNotes notes={this.publicNotes} />
        </ul>
      </>
    );
  }
}

export default inject("noteStore", "userStore")(observer(AddNote));
