import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import detail from "../styles/Detail.module.css";
import login_register from "../styles/Login_register.module.css";
import { ROUTES } from "../constants";
import global from "../styles/global.module.css";
import login from "../styles/Login_register.module.css";

class NoteDetail extends Component {
  constructor({ ...data }) {
    super();
    this.commentRef = React.createRef();

    this.data = data;
    this.noteStore = data.noteStore;
    this.commentStore = data.commentStore;
    this.id = data.id;
    this.note = {};
    this.comments = [];

    this.noteStore.getNote(this.id);
    this.commentStore.getComments();

    //Huidige bezoeker ophalen
    this.userStore = data.userStore;
    this.currentUser = this.userStore.authUser;

    this.state = {
      commentInput: ""
    };
  }

  handleClickEdit = () => {
    this.setState({ edit: true });
  };

  handleClickDone = () => {
    this.setState({ edit: false });
  };

  handleSubmitComment = e => {
    e.preventDefault();

    this.commentStore.addComment({
      noteId: this.id,
      comment: this.commentRef.current.value,
      user: this.currentUser
    });

    this.commentRef.current.value = ``;
    this.setState({ commentInput: "" });
  };

  getDate = comment => {
    const date = new Date(`${comment.createdAt}`);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return `${dt}/${month}/${year}`;
  };

  getTime = comment => {
    const date = new Date(`${comment.createdAt}`);

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (hour < 10) {
      hour = "0" + hour;
    }

    return `${hour}:${minutes}:${seconds}`;
  };

  handleComment = e => {
    this.setState({ commentInput: e.target.value });
  };

  logOutUser = () => {
    this.userStore.logout();
  };

  render() {
    if (this.noteStore.notes.find(note => note.id === this.id) !== undefined)
      this.note = this.noteStore.notes.find(note => note.id === this.id);

    if (
      this.commentStore.comments.filter(
        comment => comment.noteId === this.id
      ) !== undefined
    )
      this.comments = this.commentStore.comments.filter(
        comment => comment.noteId === this.id
      );

    const { commentInput } = this.state;
    const isEnabled = commentInput.length > 0;

    const notePoster = this.note.userId;

    if (this.userStore.authUser !== null) {
      const visitor = this.userStore.authUser._id;

      if (this.note.privacy === `private` && visitor !== notePoster) {
        return (
          <section className={detail.restricted_section}>
            <h1>
              Heelaba, blijf eens weg van mn privacy! &nbsp;
              <span className={detail.noter}>
                -Groetjes {this.note.user.name}
              </span>
            </h1>
            <nav>
              <Link
                to={ROUTES.home}
                className={`${login_register.goback} goback_login_register`}
              >
                Oeps, was niet mijn bedoeling
              </Link>
              <Link
                to={ROUTES.home}
                className={`${login_register.goback} goback_login_register`}
              >
                T'is om te rotten é
              </Link>
            </nav>
          </section>
        );
      } else {
        return (
          <>
            <section
              className={`${detail.section} ${
                detail[this.note.color + `_border`]
              } ${detail[`shadow_` + this.note.color]}`}
            >
              <ul
                className={`${detail.note} ${detail[this.note.color + `_bg`]}`}
              >
                <article className={detail.the_note}>
                  <h1>{this.note.title}</h1>
                  <p>{this.note.description}</p>
                </article>
                <div className={detail.note_bottom}>
                  <Link
                    to="/"
                    className={`${detail.backbtn} ${
                      detail[this.note.color + `_bg_light`]
                    }`}
                  >
                    <span className={detail.back_arrow}>&#60;</span> Back
                  </Link>
                  {this.note.user !== undefined ? (
                    <address className={detail.by}>
                      By {this.note.user.name}
                    </address>
                  ) : (
                    ``
                  )}
                </div>
              </ul>
              {this.userStore.authUser ? (
                <>
                  <div className={`${global.login_btn} loggedin_section`}>
                    <p className={login.logged_in}>
                      Ingelogd als{" "}
                      <span className={login.person}>
                        {this.currentUser.name}
                      </span>
                    </p>
                  </div>
                  <div className={detail.comments}>
                    <div className={detail.comment_section}>
                      <h2
                        className={`${detail.green} ${
                          detail[this.note.color + `_color`]
                        }`}
                      >
                        Comments:
                      </h2>
                      <ul className={detail.commentlist}>
                        {this.comments.map(comment => {
                          //Calculating Time
                          this.date = this.getDate(comment);
                          this.time = this.getTime(comment);

                          return (
                            <li
                              key={Math.random()}
                              className={`${detail.comments_li} single_comment`}
                            >
                              <aside className={detail.datetime}>
                                <span className={detail.date}>{this.date}</span>
                                <span className={detail.time}>{this.time}</span>
                              </aside>
                              <p className={detail.message}>
                                {comment.comment}
                              </p>
                              <h3
                                className={`${detail.commentby} ${
                                  detail[this.note.color + `_color`]
                                }`}
                              >
                                {comment.user.name}
                              </h3>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <form
                      onSubmit={this.handleSubmitComment}
                      className={detail.form_post}
                    >
                      <textarea
                        type="text"
                        name="comment"
                        className={`${detail.textarea} ${
                          detail[this.note.color + `_border`]
                        } textarea_comment`}
                        id="comment"
                        ref={this.commentRef}
                        placeholder="Enter your message here"
                        onChange={this.handleComment}
                      />

                      <button
                        className={`${detail.button_post} ${
                          detail[this.note.color + `_bg`]
                        }`}
                        disabled={!isEnabled}
                      >
                        Post Comment
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${detail.comments} ${detail.comments_big}`}>
                    <div className={detail.comment_section}>
                      <h2
                        className={`${detail.green} ${
                          detail[this.note.color + `_color`]
                        }`}
                      >
                        Comments:
                      </h2>
                      <ul
                        className={`${detail.commentlist} ${
                          detail.comment_size_big
                        }`}
                      >
                        {this.comments.map(comment => {
                          //Calculating Time
                          this.date = this.getDate(comment);
                          this.time = this.getTime(comment);

                          return (
                            <li
                              key={Math.random()}
                              className={`${detail.comments_li} single_comment`}
                            >
                              <aside className={detail.datetime}>
                                <span className={detail.date}>{this.date}</span>
                                <span className={detail.time}>{this.time}</span>
                              </aside>
                              <p className={detail.message}>
                                {comment.comment}
                              </p>
                              <h3
                                className={`${detail.commentby} ${
                                  detail[this.note.color + `_color`]
                                }`}
                              >
                                {comment.user.name}
                              </h3>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <p className={login_register.register_btn}>
                      To comment please{" "}
                      <Link to={ROUTES.login} className={login_register.a}>
                        Login
                      </Link>{" "}
                      or{" "}
                      <Link to={ROUTES.register} className={login_register.a}>
                        Sign up!
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </section>
          </>
        );
      }
    } else {
      if (this.note.privacy === `private`) {
        return (
          <section className={detail.restricted_section}>
            <h1>
              Heelaba, blijf eens weg van mn privacy! -Grtjs{" "}
              {this.note.user.name}
            </h1>
            <nav>
              <Link
                to={ROUTES.home}
                className={`${login_register.goback} goback_login_register`}
              >
                Oeps, was niet mijn bedoeling
              </Link>
              <Link
                to={ROUTES.home}
                className={`${login_register.goback} goback_login_register`}
              >
                T'is om te rotten é
              </Link>
            </nav>
          </section>
        );
      } else {
        return (
          <>
            <section
              className={`${detail.section} ${
                detail[this.note.color + `_border`]
              } ${detail[`shadow_` + this.note.color]}`}
            >
              <ul
                className={`${detail.note} ${detail[this.note.color + `_bg`]}`}
              >
                <article className={detail.the_note}>
                  <h1>{this.note.title}</h1>
                  <p>{this.note.description}</p>
                </article>
                <div className={detail.note_bottom}>
                  <Link
                    to="/"
                    className={`${detail.backbtn} ${
                      detail[this.note.color + `_bg_light`]
                    }`}
                  >
                    <span className={detail.back_arrow}>&#60;</span> Back
                  </Link>
                  {this.note.user !== undefined ? (
                    <address className={detail.by}>
                      By {this.note.user.name}
                    </address>
                  ) : (
                    ``
                  )}
                </div>
              </ul>
              {this.userStore.authUser ? (
                <>
                  <div className={`${global.login_btn} loggedin_section`}>
                    <p className={login.logged_in}>
                      Ingelogd als{" "}
                      <span className={login.person}>
                        {this.currentUser.name}
                      </span>
                    </p>
                  </div>
                  <div className={detail.comments}>
                    <div className={detail.comment_section}>
                      <h2
                        className={`${detail.green} ${
                          detail[this.note.color + `_color`]
                        }`}
                      >
                        Comments:
                      </h2>
                      <ul className={detail.commentlist}>
                        {this.comments.map(comment => {
                          //Calculating Time
                          this.date = this.getDate(comment);
                          this.time = this.getTime(comment);

                          return (
                            <li
                              key={Math.random()}
                              className={`${detail.comments_li} single_comment`}
                            >
                              <aside className={detail.datetime}>
                                <span className={detail.date}>{this.date}</span>
                                <span className={detail.time}>{this.time}</span>
                              </aside>
                              <p className={detail.message}>
                                {comment.comment}
                              </p>
                              <h3
                                className={`${detail.commentby} ${
                                  detail[this.note.color + `_color`]
                                }`}
                              >
                                {comment.user.name}
                              </h3>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <form
                      onSubmit={this.handleSubmitComment}
                      className={detail.form_post}
                    >
                      <textarea
                        type="text"
                        name="comment"
                        className={`${detail.textarea} ${
                          detail[this.note.color + `_border`]
                        } textarea_comment`}
                        id="comment"
                        ref={this.commentRef}
                        placeholder="Enter your message here"
                        onChange={this.handleComment}
                      />

                      <button
                        className={`${detail.button_post} ${
                          detail[this.note.color + `_bg`]
                        }`}
                        disabled={!isEnabled}
                      >
                        Post Comment
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${detail.comments} ${detail.comments_big}`}>
                    <div className={detail.comment_section}>
                      <h2
                        className={`${detail.green} ${
                          detail[this.note.color + `_color`]
                        }`}
                      >
                        Comments:
                      </h2>
                      <ul
                        className={`${detail.commentlist} ${
                          detail.comment_size_big
                        }`}
                      >
                        {this.comments.map(comment => {
                          //Calculating Time
                          this.date = this.getDate(comment);
                          this.time = this.getTime(comment);

                          return (
                            <li
                              key={Math.random()}
                              className={`${detail.comments_li} single_comment`}
                            >
                              <aside className={detail.datetime}>
                                <span className={detail.date}>{this.date}</span>
                                <span className={detail.time}>{this.time}</span>
                              </aside>
                              <p className={detail.message}>
                                {comment.comment}
                              </p>
                              <h3
                                className={`${detail.commentby} ${
                                  detail[this.note.color + `_color`]
                                }`}
                              >
                                {comment.user.name}
                              </h3>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <p className={login_register.register_btn}>
                      To comment please{" "}
                      <Link to={ROUTES.login} className={login_register.a}>
                        Login
                      </Link>{" "}
                      or{" "}
                      <Link to={ROUTES.register} className={login_register.a}>
                        Sign up!
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </section>
          </>
        );
      }
    }
  }
}

export default inject("noteStore", "commentStore", "userStore")(
  observer(NoteDetail)
);
