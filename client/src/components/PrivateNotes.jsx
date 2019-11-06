import React from "react";
import { Redirect } from "react-router-dom";
import EditNote from "./EditNote.jsx";
import { inject, observer } from "mobx-react";

const privateNotes = ({ ...data }) => {
  const notes = data.notes;

  if (data.currentUser !== null) {
    return (
      <>
        {notes.map(note => (
          <EditNote
            currentUser={data.currentUser._id}
            key={note.id}
            note={note}
            saveNote={data.noteStore.updateNote}
            deleteNote={data.noteStore.deleteNote}
          />
        ))}
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default inject("noteStore")(observer(privateNotes));
