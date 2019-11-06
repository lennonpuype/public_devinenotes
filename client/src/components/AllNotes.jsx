import React from "react";
import styles from "../styles/Notes.module.css";
import { inject, observer } from "mobx-react";
import PrivateNotes from "./PrivateNotes.jsx";
import PublicNotes from "./PublicNotes.jsx";

const allNotes = ({ ...data }) => {
  const publicNotes = data.publicNotes;
  const privateNotes = data.privateNotes;

  if (data.currentUser !== null) {
    return (
      <>
        <PublicNotes currentUser={data.currentUser} notes={publicNotes} />
        <PrivateNotes currentUser={data.currentUser} notes={privateNotes} />
      </>
    );
  } else {
    return (
      <>
        <ul className={styles.ul}>
          <PublicNotes currentUser={data.currentUser} notes={publicNotes} />
        </ul>
      </>
    );
  }
};

export default inject("noteStore")(observer(allNotes));
