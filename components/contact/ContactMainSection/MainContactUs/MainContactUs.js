import "bootstrap/dist/css/bootstrap.min.css";

import { message } from "antd";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { contactUs } from "service/search/operations.js";

import { LocateTitle } from "../MainLocateUs/MainLocateUs.style";
import {
  FormSubBlog,
  MainContactForm,
  MainContactUsBlog,
  MainContactUsContent,
} from "./MainContactUs.style";

const MainContactUs = (props) => {
  const { contactUs } = props;
  const [validated, setValidated] = React.useState(false);
  const [isShowModal, setShowModal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [contents, setContents] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const data = new FormData(event.target);
      if (ValidateEmail(data.get("email")) === false) {
        message.error("Je email adres lijkt niet te kloppen!", [2.5]);
        return;
      }

      if (ValidatePhoneNumber(data.get("telephone")) === false) {
        message.error("Klopt je telefoonnummer?", [2.5]);
        return;
      }

      setValidated(true);
      const contacts = {
        name: data.get("name"),
        email: data.get("email"),
        telephone: data.get("telephone"),
        contents: data.get("contents"),
      };

      contactUs(contacts);
      setShowModal(true);
    } else {
      message.error("please input correct data", [2.5]);
    }
  };

  function hideSuccessPopup() {
    setShowModal(false);
    setName("");
    setEmail("");
    setPhone("");
    setContents("");
    setValidated(false);
  }

  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function ValidatePhoneNumber(inputtxt) {
    var phoneno =
      /^((\+|00(\s|\s?-\s?)?)31(\s|\s?-\s?)?(\(0\)[-\s]?)?|0)[1-9]((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
  };
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  return (
    <MainContactUsBlog className="main-contact-us-blog">
      <MainContactUsContent>
        <LocateTitle>Neem contact met ons op</LocateTitle>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <MainContactForm>
            <FormSubBlog>
              <Form.Control
                className="contact-form-input mt-3"
                name="name"
                type="text"
                placeholder="Je naam"
                value={name}
                onChange={changeName}
              />
              <Form.Control
                className="contact-form-input mt-3"
                name="email"
                type="email"
                placeholder="Emailadres"
                value={email}
                onChange={changeEmail}
              />
              <Form.Control
                className="contact-form-input mt-3"
                name="telephone"
                type="text"
                placeholder="Telefoonnummer"
                value={phone}
                onChange={changePhone}
              />
            </FormSubBlog>
            <FormSubBlog>
              <Form.Control
                className="contact-form-input mt-3"
                as="textarea"
                name="contents"
                placeholder="Wat je aan ons kwijt wilt."
                rows="3"
                value={contents}
                onChange={changeContents}
              />
              <Button variant="success" type="submit" className="mt-3">
                Verzend
              </Button>
            </FormSubBlog>
          </MainContactForm>
        </Form>
        <Modal
          show={isShowModal}
          onHide={hideSuccessPopup}
          className="appointment-confirm-success-modal"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <p>
              Bedankt voor je bericht, indien nodig nemen we zo snel mogelijk
              contact met je op!
            </p>
            <p>{contents}</p>
          </Modal.Body>
        </Modal>
      </MainContactUsContent>
    </MainContactUsBlog>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  shoplist: state.search.list,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    contactUs: (data, dispatch) => {
      contactUs(data, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContactUs);
