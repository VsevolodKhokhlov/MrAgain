import { notification } from "antd";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import { useScreenSize } from "@/utils/media";

import DefaultLayout from "../components/layouts/Homepage";
import { resetPasswordModule } from "../components/resetPassword/modules";
import drawing from "../public/images/login/drawing.svg";
import wave from "../public/images/login/wave.svg";
import {
  Button,
  ButtonWrapper,
  DrawingWrapper,
  FormBox,
  FormText,
  FormTitle,
  FormWrapper,
  Gradient,
  Label,
  LabelWrapper,
  MainWrapper,
  RightSide,
  TextInput,
  WaveWrapper,
} from "../styled-components/reset-password";

const ResetPass = () => {
  const [disable, setDisable] = useState(false);
  const smallScreenSizes = ["tablet", "desktop", "mobile"];
  const { size } = useScreenSize();

  useEffect(() => {
    async function loadData() {
      await resetPasswordModule.actions.initialize();
    }
    loadData();
  }, []);

  async function sendResetData() {
    try {
      await resetPasswordModule.actions.submit();
      notification.success({
        description:
          "We hebben je een email verzonden waarmee je je wachtwoord kunt wijzigen.",
        duration: 2.5,
      });
      setDisable(false);
      const updates = resetPasswordModule.state.initialValues;
      resetPasswordModule.actions.batchChange({ updates });
    } catch (error) {
      const { errors } = loginModule.state;
      if (Object.keys(errors).length) {
        return;
      }
      if (error !== "") {
        notification.error({
          message: "Er is wat fout gegaan, klopt je emailadres?",
        });
      }
    }
  }

  return (
    <>
      <DefaultLayout showSignup={false}>
        <Head>
          <title itemProp="name">Mr Again - Reset je wachtwoord</title>
          <meta
            name="Keywords"
            content="Login Mr-again, LoginIn Again, mr-Again-login"
          />
          <meta
            name="description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <link rel="canonical" href="" />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta
            name="og_title"
            property="og:title"
            content=" Reset je wachtwoord"
          />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <meta name="og:url" content="" />
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <MainWrapper>
          <FormWrapper>
            {smallScreenSizes.includes(size) && (
              <WaveWrapper>
                <Image src={wave} layout="fill" objectFit="cover" />
                <DrawingWrapper>
                  <Image src={drawing} width={242} height={160} />
                </DrawingWrapper>
              </WaveWrapper>
            )}

            <FormTitle>Reset je wachtwoord</FormTitle>
            <FormText>Vul je emailadres in:</FormText>

            <FormBox>
              <Form
                module={resetPasswordModule}
                onSubmit={(ev) => {
                  ev.preventDefault();
                  sendResetData();
                  setDisable(true);
                }}
              >
                <LabelWrapper>
                  <Label>Emailadres</Label>

                  <Field name="email" as={TextInput} />
                </LabelWrapper>

                <ButtonWrapper>
                  <Button type="submit" disabled={disable}>
                    Reset wachtwoord
                  </Button>{" "}
                </ButtonWrapper>
              </Form>
            </FormBox>
          </FormWrapper>

          <div
            style={{ display: "flex", flexDirection: "column", flex: "2.5" }}
          >
            <Gradient />
            <RightSide />
          </div>
        </MainWrapper>
      </DefaultLayout>
    </>
  );
};

export default ResetPass;
