import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import withAuthentication from "../components/auth/WithAuthentication";
import PrivateNotes from "./PrivateNotes.jsx";
import AllNotes from "./AllNotes.jsx";
import PublicNotes from "./PublicNotes.jsx";
import styles from "../styles/Notes.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/index.js";
import login from "../styles/Login_register.module.css";
import global from "../styles/global.module.css";

class Notes extends Component {
  constructor({ noteStore, userStore }) {
    super();
    this.noteStore = noteStore;

    this.notes = this.noteStore.notes;
    this.privateNotes = {};
    this.publicNotes = {};

    //getting user
    this.userStore = userStore;
    this.currentUser = userStore.authUser;

    this.state = {
      privacy: `all`
    };
  }

  logOutUser = () => {
    this.userStore.logout();
  };

  handleOnChange = e => {
    this.setState({ privacy: e.currentTarget.value });
  };

  render() {
    if (
      this.noteStore.notes.filter(note => note.privacy === `public`) !==
      undefined
    )
      this.publicNotes = this.noteStore.notes.filter(
        note => note.privacy === `public`
      );

    if (this.userStore.authUser) {
      const { privacy } = this.state;

      if (
        this.noteStore.notes.filter(note => note.privacy === `private`) !==
        undefined
      ) {
        this.privateNotes = this.noteStore.notes.filter(
          note =>
            note.privacy === `private` && note.userId === this.currentUser._id
        );
      }

      return (
        <>
          {this.userStore.authUser ? (
            <>
              <div className={`${global.login_btn} loggedin_section`}>
                <p className={login.logged_in}>
                  Ingelogd als{" "}
                  <span className={login.person}>{this.currentUser.name}</span>
                </p>
                <span
                  onClick={() => this.logOutUser()}
                  className={global.logout_btn}
                >
                  Logout
                </span>
              </div>
              <ul className={`${styles.privacyBox} privacyBox_privacy`}>
                <input
                  type="radio"
                  id="all"
                  name="privacy"
                  value="all"
                  defaultChecked
                  onChange={e => this.handleOnChange(e)}
                />
                <label
                  htmlFor="all"
                  className={`${styles.label} label_active_privacty`}
                >
                  All
                </label>
                <input
                  type="radio"
                  id="public"
                  name="privacy"
                  value="public"
                  onChange={e => this.handleOnChange(e)}
                />
                <label
                  htmlFor="public"
                  className={`${styles.label} label_active_privacty`}
                >
                  Public
                </label>
                <input
                  type="radio"
                  id="private"
                  name="privacy"
                  value="private"
                  onChange={e => this.handleOnChange(e)}
                />
                <label
                  htmlFor="private"
                  className={`${styles.label} label_active_privacty`}
                >
                  Private
                </label>
              </ul>
            </>
          ) : (
              ``
            )}

          {privacy === `all` ? (
            <ul className={styles.ul}>
              <li className={`${styles.li} ${styles.addmain_blue} add_note`}>
                <Link
                  to={`/note/add`}
                  className={`${styles.a_addmain_blue} ${styles.a}`}
                >
                  +
                </Link>
              </li>
              <AllNotes
                currentUser={this.currentUser}
                privateNotes={this.privateNotes}
                publicNotes={this.publicNotes}
              />
            </ul>
          ) : (
              ``
            )}
          {privacy === `public` ? (
            <ul className={styles.ul}>
              <li className={`${styles.li} ${styles.add_blue} add_note`}>
                <Link
                  to={`/note/add`}
                  className={`${styles.a_add_blue} ${styles.a}`}
                >
                  +
                </Link>
              </li>

              <PublicNotes
                currentUser={this.currentUser}
                notes={this.publicNotes}
              />
            </ul>
          ) : (
              ``
            )}
          {privacy === `private` ? (
            <ul className={styles.ul}>
              <li className={`${styles.li} ${styles.add_blue} add_note`}>
                <Link
                  to={`/note/add`}
                  className={`${styles.a_add_blue} ${styles.a}`}
                >
                  +
                </Link>
              </li>
              <PrivateNotes
                currentUser={this.currentUser}
                notes={this.privateNotes}
              />
            </ul>
          ) : (
              ``
            )}
        </>
      );
    } else {
      return (
        <>
          <nav className={`${global.login_btn} login_register_btn`}>
            <Link
              to={ROUTES.login}
              className={`${global.login_button} ${global.login_or_register}`}
            >
              Login
            </Link>
            <Link
              to={ROUTES.register}
              className={`${global.login_or_register} ${
                global.register_button
                } register_button`}
            >
              Register
            </Link>
          </nav>

          <ul className={styles.ul}>
            <PublicNotes notes={this.publicNotes} />
          </ul>
        </>
      );
    }
  }
}

export default inject("noteStore", "userStore")(
  withAuthentication(observer(Notes))
);
