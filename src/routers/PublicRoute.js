import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />
    }
  />
);

// connect component to redux store เพื่อเอาข้อมูล uid
const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});
// export connected version
export default connect(mapStateToProps)(PublicRoute);
