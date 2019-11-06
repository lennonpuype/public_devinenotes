import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import login_register from "../../styles/Login_register.module.css";

class RegisterForm extends Component {
  constructor({ ...data }) {
    super();
    this.state = {
      email: ``,
      pwd: ``,
      pwd2: ``,
      name: ``,
      error: ``
    };

    this.userStore = data.userStore;
    this.userStore.getUsers();
  }

  handleChange = e => {
    const input = e.currentTarget;
    const state = { ...this.state };
    state[input.name] = input.value;

    this.setState(state);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { userStore, history } = this.props;
    const { email, pwd, name } = this.state;
    userStore
      .register(name, email, pwd)
      .then(() => {
        history.push(ROUTES.login);
      })
      .catch(data => {
        this.setState({ error: data.message });
      });
  };

  render() {
    const { email, pwd, pwd2, name, error } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit} className={login_register.form}>
          <label htmlFor="email" className={login_register.label}>
            <span className={login_register.label_span}>Name</span>
            <input
              type="test"
              name="name"
              id="name="
              value={name}
              onChange={this.handleChange}
              className={`${login_register.input} inputfield`}
            />
          </label>
          <label htmlFor="email" className={login_register.label}>
            <span className={login_register.label_span}>Email</span>
            <input
              type="email"
              name="email"
              id="email="
              value={email}
              onChange={this.handleChange}
              className={`${login_register.input} inputfield`}
            />
            <span className={login_register.error}>{error}</span>
          </label>
          <label htmlFor="username" className={login_register.label}>
            <span className={login_register.label_span}>Password</span>
            <input
              type="password"
              name="pwd"
              id="pwd"
              value={pwd}
              onChange={this.handleChange}
              className={`${login_register.input} inputfield`}
            />
          </label>
          <label htmlFor="username" className={login_register.label}>
            <span className={login_register.label_span}>Repeat password</span>
            <input
              type="password"
              name="pwd2"
              id="pwd2"
              ref={pwd2}
              onChange={this.handleChange}
              className={`${login_register.input} inputfield`}
            />
          </label>
          <input
            type="submit"
            value="Register"
            disabled={pwd !== pwd2}
            className={login_register.login}
          />
        </form>
        <p className={login_register.register_btn}>
          Already having a account?{" "}
          <Link to={ROUTES.login} className={login_register.a}>
            Sign in!
          </Link>
        </p>
      </>
    );
  }
}

export default inject(`userStore`)(withRouter(RegisterForm));
