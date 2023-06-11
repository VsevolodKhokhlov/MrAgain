import "./meld-je-aan-als-reparateur.style.less";
import "./meld-je-aan-als-reparateur.style.less";

import Head from "next/head";
import React, { useEffect } from "react";

import DefaultLayout from "@/components/layouts/Homepage";
import { FRONT_END_URL } from "@/constants";
import { Main } from "@/styled-components/meld-je-aan-als-reparateur.style.jsx";

import { RegisterSection } from "../components/land";

const Land = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let canonical = `${FRONT_END_URL}/meld-je-aan-als-reparateur`;

  return (
    <DefaultLayout showSignup>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          Elektronica reparateur? Meld je aan bij MrAgain en word direct beter
          gevonden!
        </title>
        <meta
          name="description"
          content="Wil je als reparateur beter online gevonden worden? MrAgain is het platform voor elektronica reparateurs. Meld je aan en word direct beter gevonden!"
        />
        <link rel="canonical" href={canonical} />
      </Head>
      <Main>
        <RegisterSection />
      </Main>
    </DefaultLayout>
  );
};

export default Land;
