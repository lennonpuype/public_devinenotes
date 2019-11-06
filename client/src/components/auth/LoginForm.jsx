import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
import login_register from "../../styles/Login_register.module.css";

const LoginForm = ({ userStore, history }) => {
  const emailInput = React.createRef();
  const pwdInput = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    userStore.login(history, emailInput.current.value, pwdInput.current.value);
  };

  const handleInputChange = () => {};

  return (
    <>
      <span className={login_register.error}>{userStore.error}</span>

      <form onSubmit={handleSubmit} className={login_register.form}>
        <label htmlFor="email" className={login_register.label}>
          <span className={login_register.label_span}>Email</span>
          <input
            type="email"
            name="email"
            id="email="
            ref={emailInput}
            className={`${login_register.input} inputfield`}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="username" className={login_register.label}>
          <span className={login_register.label_span}>Password</span>
          <input
            type="password"
            name="password"
            id="password"
            ref={pwdInput}
            className={`${login_register.input} inputfield`}
            onChange={handleInputChange}
            required
          />
        </label>
        <input type="submit" value="Login" className={login_register.login} />
      </form>

      <p className={login_register.register_btn}>
        No account?{" "}
        <Link to={ROUTES.register} className={login_register.a}>
          Sign up!
        </Link>
      </p>
    </>
  );
};

LoginForm.propTypes = {
  userStore: PropTypes.observableObject.isRequired
};

export default inject(`userStore`)(withRouter(observer(LoginForm)));
