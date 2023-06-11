import "./RegisterForm.style.less";

import { Checkbox, notification } from "antd";
import Image from "next/image";
import router from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";

import logo from "@/assets/images/logo.png";
import { SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import { AGREEMENT_TEXT } from "@/constants";
import Form from "@/modules/forms";
import { Field, parseNativeEvent } from "@/modules/forms/Blocks";
import Modal from "@/modules/modal";

import { agrementModal, registerFormModule } from "./modules";
import {
  AccountSubTitle,
  AccountTitle,
  ChamberInputWrap,
  CheckboxWrap,
  FormWrap,
  InputWrap,
  RegisterFormArea,
} from "./RegisterForm.style";

const ChamberInput = ({ value, onChange }) => {
  return (
    <ChamberInputWrap>
      <div></div>
      <input
        onChange={(value) => {
          const ev = parseNativeEvent(value);
          onChange(ev);
        }}
        value={value}
      />
    </ChamberInputWrap>
  );
};

const AgreeSection = styled.div`
  display: flex;
`;

const TermCheckbox = ({ value, onChange }) => {
  return (
    <AgreeSection>
      <CheckboxWrap>
        <Checkbox
          onChange={(value) => {
            const ev = parseNativeEvent(value);
            onChange(ev);
          }}
          checked={value}
        />
      </CheckboxWrap>
      <div>
        Door een account aan te maken ga ik akkoord met{" "}
        <a
          onClick={() => {
            agrementModal.actions.open();
          }}
          className="agree-description"
        >
          De voorwaarden
        </a>
      </div>
    </AgreeSection>
  );
};

async function registerUser() {
  try {
    await registerFormModule.actions.submit();

    notification.success({
      description:
        "Bedankt voor je aanmelding bij MrAgain. We voeren nu enkele checks uit waarna je een email van ons ontvangt om je account te activeren. Let op: deze email kan in je spam terecht komen!",
      duration: 2.5,
    });

    setTimeout(() => {
      router.router.push("/");
    }, 3000);
  } catch (error) {
    const { errors } = registerFormModule.state;
    if (Object.keys(errors).length) {
      return;
    }
    if (error !== "") {
      notification.error({
        message: error.error,
      });
    }
  }
}

const RegisterForm = () => {
  useEffect(() => {
    async function loadData() {
      await registerFormModule.actions.initialize();
    }

    loadData();
  }, []);

  return (
    <RegisterFormArea>
      <AccountTitle className="row">Laten we beginnen!</AccountTitle>
      <AccountSubTitle>Registreer nu je gratis account</AccountSubTitle>
      <div className="row">
        <div className="account-create-container2">
          <div className="account-create-container2-wrap">
            <FormWrap>
              <Form
                module={registerFormModule}
                onSubmit={(ev) => {
                  ev.preventDefault();
                  registerUser();
                }}
              >
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="companyName"
                    label="Bedrijfsnaam"
                  />
                </InputWrap>
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="chamber"
                    label="kvk nummer"
                    as={ChamberInput}
                  />
                </InputWrap>
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="email"
                    label="Emailadres"
                    autoComplete="email"
                  />
                </InputWrap>
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="password"
                    label="Wachtwoord"
                    type="password"
                  />
                </InputWrap>
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="confirmPassword"
                    label="Bevestig je wachtwoord"
                    type="password"
                  />
                </InputWrap>
                <Field name="terms" as={TermCheckbox} />
                <div className="account-button-container">
                  <Button className="account-create-btn2" type="submit">
                    Registreer
                  </Button>
                </div>
              </Form>
            </FormWrap>
          </div>
        </div>
      </div>
      <Modal
        title={<SubTitle>Agreement</SubTitle>}
        footer={null}
        module={agrementModal}
      >
        <div dangerouslySetInnerHTML={{ __html: AGREEMENT_TEXT }} />
      </Modal>
    </RegisterFormArea>
  );
};

export default RegisterForm;
