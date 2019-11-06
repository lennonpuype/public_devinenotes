import React from "react";

import { ROUTES } from "../constants";
import { Redirect } from "react-router-dom";

const Logout = ({ userStore }) => {
  return (
    <>
      {userStore.logout()}
      <Redirect to={ROUTES.home} />
    </>
  );
};

export default inject("userStore")(observer(Logout));
