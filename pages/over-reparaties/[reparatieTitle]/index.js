import { Layout } from "components/global";
import Head from "next/head";
import React from "react";
import { useEffect } from "react";

import PageDetails from "@/components/PageComponent/PageDetails";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";

import { API_PATH, FRONT_END_URL } from "../../../constants";

export default function ReparatieTitle({ reparatieDetails, reparatieTitle }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let reparatie = null;
  if (reparatieDetails !== undefined) {
    reparatie = reparatieDetails[0];
  }

  return (
    <Layout>
      <Main>
        {reparatie !== null && (
          <div className="blog-content">
            <Head>
              <title>{reparatie.title}</title>
              <meta name="Keywords" content={reparatie.seo_keyword} />
              <meta name="description" content={reparatie.seo_description} />
              <link
                rel="canonical"
                href={`${FRONT_END_URL}/over-reparaties/${reparatieTitle}`}
              />
              <meta property="og:type" content="website" />
              <meta property="og:title" content={reparatie.title} />
              <meta
                property="og:description"
                content={reparatie.seo_description}
              />
              <meta
                property="og:url"
                content={`${FRONT_END_URL}/over-reparaties/${reparatieTitle}`}
              />
              <meta property="og:image" content={reparatie.post_image} />
              <meta property="og:site_name" content="MrAgain" />
            </Head>
            <div className="row">
              <PageDetails pageDetails={reparatie} />
            </div>
          </div>
        )}
      </Main>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_PATH.GETPAGES}/?t=p`);
//   const reparaties = await res.json();
//   // console.log("🚀 => getStaticPaths => reparaties", reparaties);

//   const paths = reparaties.map((reparatie) => `/reparatie/${reparatie.slug}`);
//   // console.log("🚀 => getStaticPaths => paths", paths);
//   return { paths, fallback: true };
// }
export async function getServerSideProps({ query, params }) {
  const { reparatieTitle } = query || params;

  const res = await fetch(API_PATH.GETPAGEDETAILS + "/?slug=" + reparatieTitle);
  const reparatieDetails = await res.json();

  return {
    props: {
      reparatieDetails,
      reparatieTitle,
    },
  };
}
