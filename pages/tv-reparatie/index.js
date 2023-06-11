import "../general.css";

import { Layout } from "components/global";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

import { FRONT_END_URL } from "@/constants";
import { getAllBrandModels } from "@/service/search/operations";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";

import BrandsComponent from "../../components/models/BrandsComponent";

export default function Index({ brandModels, device }) {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Main>
        <Head>
          <title>Mr. Again TV Reparatie</title>
          <link rel="canonical" href={`${FRONT_END_URL}` + router.asPath} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Mr. Again TV Reparatie" />
          <meta
            property="og:url"
            content={`${FRONT_END_URL}` + router.asPath}
          />
          <meta property="og:site_name" content="MrAgain" />
          {/* <meta name="Keywords" content={blog.seo_keyword} />
            <meta name="description" content={blog.seo_description} />
            <meta property="og:description" content={blog.seo_description} />
              <meta property="og:image" content={blog.post_image} />
            */}
        </Head>
        <div className="main-section">
          <div className="row">
            <BrandsComponent data={brandModels} deviceId={device.device} />
          </div>
        </div>
      </Main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const device = {
    device: 7,
  };

  const brandModels = await getAllBrandModels(device);
  return {
    props: {
      brandModels,
      device,
    },
  };
}
