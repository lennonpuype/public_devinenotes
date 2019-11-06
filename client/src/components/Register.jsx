import React from "react";

import RegisterForm from "./auth/RegisterForm";
import { ROUTES } from "../constants";
import { Link } from "react-router-dom";
import login_register from "../styles/Login_register.module.css";

const Register = () => {
  return (
    <>
      <section className={login_register.section_login}>
        <div>
          <Link
            to={ROUTES.home}
            className={`${login_register.goback} goback_login_register`}
          >
            &#60; Go to notes
          </Link>
          <h3 className={login_register.title}>Register</h3>
        </div>
        <RegisterForm />
      </section>
    </>
  );
};

export default Register;
