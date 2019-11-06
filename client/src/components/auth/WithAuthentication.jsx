// withAuthentication.jsx
import React from "react";

import { inject, observer } from "mobx-react";

const withAuthentication = ComponentToProtect => {
  const WithAuth = props => {
    // if (!props.userStore.authUser) {
    //   return <Redirect to={ROUTES.login} />;
    // }
    return (
      <ComponentToProtect {...props} authUser={props.userStore.authUser} />
    );
  };

  return inject(`userStore`)(observer(WithAuth));
};
export default withAuthentication;
