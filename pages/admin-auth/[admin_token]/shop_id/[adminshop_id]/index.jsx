import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAuthUser, loginAsUser } from "service/account/operations";

import { Layout } from "@/components/global";

const AdminLoginAsUser = (routerProps) => {
  const router = useRouter();
  const { authUser, getAuthUser } = routerProps;
  const { admin_token, adminshop_id } = router.query;
  //   const [auth_user, setAuthUser] = useState({});

  /** loacal storage used for setting the token from url for the admin to login as user */
  // localStorage.setItem("auth-token", admin_token);
  useEffect(() => {
    const formData = new FormData();
    formData.append("token", admin_token);
    loginAsUser(formData);
    localStorage.setItem("auth-token", admin_token);
    let token = localStorage.getItem("auth-token");
    // if (token && Object.keys(authUser).length === 0) {
    if (token && Object.keys(authUser)) {
      getAuthUser();
    }
  }, []);

  /** UseEffect : Here we are calling the auth api again for admin to login as user. */
  useEffect(() => {
    if (Object.keys(authUser).length > 0) {
      localStorage.setItem("auth-user", JSON.stringify(authUser));
      router.push(`/dashboard`);
    }
  }, [authUser]);

  return (
    <Layout>
      <div>
        <h1>Loading the data....</h1>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.account.auth_user,
});
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getAuthUser: () => {
      getAuthUser(dispatch);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginAsUser);
