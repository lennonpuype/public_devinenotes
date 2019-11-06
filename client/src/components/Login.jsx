import React from "react";

import LoginForm from "./auth/LoginForm";
import { ROUTES } from "../constants";
import { Link, Redirect } from "react-router-dom";
import login_register from "../styles/Login_register.module.css";
import { inject, observer } from "mobx-react";

const Login = ({ userStore }) => {
  if (userStore.authUser) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <section className={login_register.section_login}>
          <Link
            to={ROUTES.home}
            className={`${login_register.goback} goback_login_register`}
          >
            &#60; Go to notes
          </Link>
          <h3 className={login_register.title}>Login</h3>
          <LoginForm />
        </section>
      </>
    );
  }
};

export default inject("userStore")(observer(Login));
