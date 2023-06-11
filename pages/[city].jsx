import "./city.less";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { PlusIcon } from "@/assets/icons/SvgIcons";
import CitySearch from "@/components/city/index.jsx";
import { searchForm } from "@/components/city/modules.js";
import DefaultLayout from "@/components/layouts/Homepage";
import { wrapper } from "@/configureStore";
import { API_URL, FRONT_END_URL } from "@/constants";
import api from "@/utils/api";

export default function City({ cityInfo }) {
  const cityContent = cityInfo?.[0];
  const router = useRouter();

  let canonical = `${FRONT_END_URL}/${cityContent?.url}`;
  let description = `Ben je op zoek naar een telefoon reparateur in ${cityContent?.name}? Voor telefoon reparatie ${cityContent?.name} vind je snel de beste reparateurs via MrAgain`;
  let title = `Telefoon Reparatie ${cityContent?.name} | Mr Again`;
  let image_url = `${FRONT_END_URL}/media/telefoon-reparatie.jpg`;

  const renderBlocks = (block, index) => {
    return (
      <div className="block" key={index}>
        <h4>{block?.header}</h4>
        <div dangerouslySetInnerHTML={{ __html: block?.content }}></div>
        <div className="show-more">
          <span>Meer weergeven</span> <PlusIcon />
        </div>
      </div>
    );
  };

  useEffect(() => {
    window.history.replaceState(
      null,
      "",
      cityContent?.name?.replace(" ", "-")?.toLowerCase()
    );
  }, [router.asPath]);

  return (
    <DefaultLayout showSignup>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta name="og_title" property="og:title" content={title} />

        <meta property="og:description" content={description} />
        <meta name="og:url" property="og:url" content={canonical} />
        <meta property="og:image" content={image_url} />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />

        <meta name="theme-color" content="#ffffff" />
      </Head>
      <section className="search">
        <CitySearch
          title={cityContent?.search_title}
          headline={cityContent?.search_headline}
        />
      </section>
      <section className="categories">
        <div className="wrapper">
          <h6>Lees meer over</h6>
          <h2>{cityContent?.headline}</h2>
          <div className="blocks-wrapper">
            <div className="subheadline-blocks">
              {cityContent?.content?.map((block, index) =>
                renderBlocks(block, index)
              )}
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  await searchForm.actions.initialize();
  const { city } = ctx?.query;
  const cityInfo = await api.get(
    `${API_URL}/city-landing?name=${city?.replace("-", " ")}`
  );

  if (!cityInfo?.length) {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }

  return {
    props: {
      cityInfo,
    },
  };
});
