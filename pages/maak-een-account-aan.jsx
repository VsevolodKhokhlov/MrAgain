import "bootstrap/dist/css/bootstrap.min.css";
import "./maak-een-account-aan.less";

import { message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { resetAuthError } from "service/account/action.js";
import { registerUser } from "service/account/operations.js";

import { Layout } from "@/components/global";

function AccountCreate(routerProps) {
  const [validated, setValidated] = useState(false);

  const { registerUser, isSignUp, auth_error, isAuth_Error, resetAuthError } =
    routerProps;
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const data = new FormData(event.target);
      if (ValidateEmail(data.get("email")) === false) {
        message.error("You have entered an invalid email address!", [2.5]);
        return;
      }

      if (data.get("password") === data.get("confirmP")) {
        setValidated(true);
      } else {
        setValidated(false);
        message.error("password and confirm password have to equal!", [2.5]);
        return;
      }
      const user = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        country: "The Netherlands",
        address: "",
        street: "",
        zipcode: "",
        city: "",
        phonumber: 0,
        kvk: "",
        btw: "",
        iban: "",
        status_app_email: 1,
        allow_appointment: 1,
        site_url: "",
        about_us: "",
        logo_photo: "",
        distance: 0,
        geo_lat: 0,
        geo_long: 0,
        ptype: 0,
      };
      registerUser(user);
    }
  };

  useEffect(() => {
    if (isSignUp === true) {
      message.success("You are registered successfully!", [2.5]);
      setTimeout(() => {
        router.push("/prijs");
      }, 3000);
    } else if (isAuth_Error === true) {
      message.error(auth_error, [2.5]);
      resetAuthError(false);
    }
  });

  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  return (
    <Layout>
      <div className="account-create-container">
        <div className="account-create-container-wrap">
          <div className="account-create-title">Let's create your account!</div>
          <div className="account-create-form">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Control
                className="account-create-input"
                type="text"
                name="name"
                placeholder="Company Name"
                required
              />
              <Form.Control
                className="account-create-input"
                type="text"
                name="email"
                placeholder="Email Address"
                required
              />
              <Form.Control
                className="account-create-input"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <Form.Control
                className="account-create-input"
                name="confirmP"
                type="password"
                placeholder="Confirm password"
                required
              />
              <Form.Check
                className="account-create-check"
                type="checkbox"
                label="I have read & agree with their terms & conditions"
                required
              />
              <Button className="account-create-btn" type="submit">
                Create My Account
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isSignUp: state.account.isSignUp,
  auth_error: state.account.auth_error,
  isAuth_Error: state.account.isAuth_Error,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    registerUser: (data) => {
      registerUser(data, dispatch);
    },
    resetAuthError: (data) => {
      dispatch(resetAuthError(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreate);
