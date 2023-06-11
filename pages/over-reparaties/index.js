import { Layout } from "components/global";
import Head from "next/head";
import React from "react";
import { useEffect } from "react";

import Pagelist from "@/components/PageComponent/PageList.js";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";

import { API_PATH, FRONT_END_URL } from "../../constants.js";

export default function Blog({ blogs }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Main>
        <div className="blog-list">
          <Head>
            <title>Telefoon Reparaties | Mr Again</title>
            <meta name="Keywords" content="Reparaties, Mr-Again" />
            <meta name="description" content="MrAgain Reparaties" />
            <link rel="canonical" href={FRONT_END_URL + "/over-reparaties"} />
            <meta property="og:type" content="website" />
            <meta
              name="og_title"
              property="og:title"
              content="Alles over electronica reparaties"
            />
            <meta
              property="og:description"
              content="Alles over electronica reparaties"
            />

            <meta name="og:url" content={FRONT_END_URL + "/over-reparaties"} />
            <meta
              property="og:image"
              content="/telefoon-reparatie-mragain.jpg"
            />
            <meta
              name="og_site_name"
              property="og:site_name"
              content="Mr Again"
            />
          </Head>
          <div className="row px-0">
            <h1 className="blog-list-title w-100 mt-4 ">
              Alles over electronica reparaties
            </h1>
            <Pagelist pages={blogs} />
          </div>
        </div>
      </Main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_PATH.GETPAGES}/?t=p`);
  const blogs = await res.json();
  return {
    props: {
      blogs,
    },
  };
}
