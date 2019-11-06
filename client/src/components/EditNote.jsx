import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes, observer } from "mobx-react";
import styles from "../styles/Notes.module.css";
import detail from "../styles/Detail.module.css";
import addNote from "../styles/AddNote.module.css";

class EditNote extends Component {
  constructor(props) {
    super(props);

    this.currentUserId = props.currentUser;
    this.state = { edit: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveNote(this.props.note);
    this.setState({ edit: false });
  };

  deleteNote = () => {
    this.props.deleteNote(this.props.note);
  };

  render() {
    const { note } = this.props;
    const { edit } = this.state;

    return edit ? (
      <form
        className={`${styles.li} ${styles.form} ${addNote[note.color + `_bg`]}`}
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className={`${detail.edit_input} ${
            detail[note.color + `_border_light`]
          }`}
          value={note.title}
          placeholder="title"
          onChange={e => note.setTitle(e.target.value)}
        />
        <textarea
          type="text"
          className={`${detail.edit_textarea} ${
            detail[note.color + `_border_light`]
          }`}
          value={note.description}
          placeholder="description"
          onChange={e => note.setDescription(e.target.value)}
        />
        <input type="submit" className={detail.editbtn} value="Save" />
      </form>
    ) : (
      <li className={`${styles.li} ${addNote[note.color + `_bg`]}`}>
        {this.currentUserId === note.userId ? (
          <>
            <div className={detail.buttons}>
              <button
                onClick={() => this.setState({ edit: true })}
                className={detail.editbtn}
              >
                Edit
              </button>
              <button onClick={this.deleteNote} className={detail.editbtn}>
                Delete
              </button>
            </div>
          </>
        ) : (
          ``
        )}
        <Link
          to={`/detail/${note.id}`}
          className={`${styles.default} ${styles.a}`}
        >
          {note.title}
        </Link>
      </li>
    );
  }
}

EditNote.propTypes = {
  note: PropTypes.observableObject.isRequired
};

export default observer(EditNote);
