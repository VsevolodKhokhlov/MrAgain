import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { FRONT_END_URL } from "@/constants";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import { useScreenSize } from "@/utils/media";

import DefaultLayout from "../components/layouts/Homepage";
import { loginModule } from "../components/login/modules";
import { API_PATH } from "../constants";
import drawing from "../public/images/login/drawing.svg";
import wave from "../public/images/login/wave.svg";
import {
  BottomText,
  BottomTextATag,
  Button,
  ButtonWrapper,
  DrawingWrapper,
  EyeWrapper,
  ForgotPass,
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
} from "../styled-components/Login.style";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const smallScreenSizes = ["tablet", "desktop", "mobile"];
  const { size } = useScreenSize();
  const router = useRouter();

  useEffect(() => {
    if (
      localStorage.getItem("auth-token") &&
      localStorage.getItem("auth-token") !== "null"
    ) {
      const user = JSON.parse(localStorage.getItem("auth-user"));
      router.push(`/dashboard`);
    }

    async function loadData() {
      await loginModule.actions.initialize();
    }
    loadData();
  }, []);

  let title = "Inloggen bij MrAgain | MrAgain";
  let description =
    "Inloggen bij MrAgai? Snel en eenvoudig inzicht in al je reparaties | MrAgain";
  let url = `${FRONT_END_URL}/login`;

  const tokenConfig1 = (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  };

  async function sendLogin() {
    try {
      let res = await loginModule.actions.submit();
      let token = await res.key;
      localStorage.setItem("auth-token", token);
      axios
        .get(`${API_PATH.GETAUTHUSER}/`, tokenConfig1(token))
        .then((res) => {
          let obj = Object.assign({}, res.data);
          delete obj.is_super;
          localStorage.setItem("auth-user", JSON.stringify(obj));
          router.push(`/dashboard`);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      const { errors } = loginModule.state;
      if (Object.keys(errors).length) {
        return;
      }
      if (error !== "") {
        notification.error({
          message: "Je wachtwoord en/of emailadres lijken niet te kloppen",
        });
      }
    }
  }

  return (
    <>
      <DefaultLayout showSignup={false}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={url} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="og:url" content={url} />
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

            <FormTitle>Welkom terug!</FormTitle>
            <FormText>Log in op je account</FormText>

            <FormBox>
              <Form
                module={loginModule}
                onSubmit={(ev) => {
                  ev.preventDefault();
                  sendLogin();
                }}
              >
                <LabelWrapper>
                  <Label>Emailadres</Label>

                  <Field name="email" as={TextInput} />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Wachtwoord</Label>

                  <Field
                    name="password"
                    as={TextInput}
                    type={passwordShown ? "text" : "password"}
                  />

                  <EyeWrapper>
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={togglePasswordVisiblity}
                      style={{ color: "lightgrey" }}
                    />
                  </EyeWrapper>
                </LabelWrapper>
                <ButtonWrapper>
                  <Button type="submit">Log in</Button>{" "}
                  <Link href="/reset-je-wachtwoord">
                    <ForgotPass>Wachtwoord vergeten?</ForgotPass>
                  </Link>
                </ButtonWrapper>
              </Form>
            </FormBox>
            <BottomText>
              Nog geen lid?{" "}
              <Link href="/meld-je-aan-als-reparateur">
                <BottomTextATag>Meld je aan!</BottomTextATag>
              </Link>
            </BottomText>
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

export default Login;
