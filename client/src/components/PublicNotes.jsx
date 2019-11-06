import React from "react";

import EditNote from "./EditNote.jsx";
import { inject, observer } from "mobx-react";

const publicNotes = ({ ...data }) => {
  const notes = data.notes;

  return (
    <>
      {data.currentUser !== undefined
        ? notes.map(note => (
            <EditNote
              currentUser={data.currentUser._id}
              key={Math.random()}
              note={note}
              saveNote={data.noteStore.updateNote}
              deleteNote={data.noteStore.deleteNote}
            />
          ))
        : notes.map(note => (
            <EditNote
              key={Math.random()}
              note={note}
              saveNote={data.noteStore.updateNote}
              deleteNote={data.noteStore.deleteNote}
            />
          ))}
    </>
  );
};

export default inject("noteStore")(observer(publicNotes));
