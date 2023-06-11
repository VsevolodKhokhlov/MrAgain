import "./index.style.less";

import Head from "next/head";
import React from "react";
import styled from "styled-components";

import OrderReview from "@/components/appointment/OrderReview.jsx";
import ContentBlocks from "@/components/content-blocks/ContentBlocks";
import AdvantagesSection from "@/components/home/AdvantagesSection/index.jsx";
import FindSection from "@/components/home/FindSection/index.jsx";
import { searchForm } from "@/components/home/modules.js";
import ShopsSection from "@/components/home/ShopsSection/index.jsx";
import StepsSection from "@/components/home/StepsSection/index.jsx";
import TestimonialSection from "@/components/home/TestimonialSection";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { wrapper } from "@/configureStore.js";
import { getNewestShopList } from "@/service/search/operations";
import media from "@/utils/media.js";

import { headers, posts } from "../assets/content/Landing/data";
import { FRONT_END_URL } from "../constants.js";

const HeroWrap = styled.div`
  overflow: hidden;
`;

const Section = styled.div`
  margin-top: 100px;

  h2 {
    margin-top: 15px;
  }
`;

const TestimonialSectionWrap = styled.div`
  margin-top: 20px;
  ${media.tablet`
    background: linear-gradient(to right, #f0f0f0 50%, #fafafa 50%);
  `}
`;

export default function Home({ shopList }) {
  return (
    <DefaultLayout showSignup>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          Telefoon reparatie nodig? Vind snel een telefoon reparateur!
        </title>
        <meta
          name="description"
          content="Telefoon kapot? Bij MrAgain vind je snel en gemakkelijk de beste telefoon reparateurs voor telefoon reparatie bij jou in de buurt."
        />
        <link rel="canonical" href={FRONT_END_URL} />
        <meta property="og:type" content="website" />
        <meta
          name="og_title"
          property="og:title"
          content="Telefoon reparatie nodig? Vind snel een telefoon reparateur!"
        />

        <meta
          property="og:description"
          content="Telefoon kapot? Bij MrAgain vind je snel en gemakkelijk de beste telefoon reparateurs voor telefoon reparatie bij jou in de buurt."
        />
        <meta name="og:url" property="og:url" content={FRONT_END_URL} />
        <meta
          property="og:image"
          content={FRONT_END_URL + "/media/telefoon-reparatie.jpg"}
        />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />

        <meta name="theme-color" content="#ffffff" />
      </Head>
      <HeroWrap>
        <MaxConstraints>
          <FindSection />
        </MaxConstraints>
      </HeroWrap>
      <Section>
        <MaxConstraints>
          <AdvantagesSection />
        </MaxConstraints>
      </Section>
      <Section>
        <MaxConstraints>
          <StepsSection />
        </MaxConstraints>
      </Section>

      <TestimonialSectionWrap>
        <MaxConstraints>
          <TestimonialSection />
        </MaxConstraints>
      </TestimonialSectionWrap>
      <Section>
        <MaxConstraints>
          <ShopsSection shopList={shopList} />
        </MaxConstraints>
      </Section>
      <Section>
        <MaxConstraints>
          <ContentBlocks headers={headers} posts={posts} />
        </MaxConstraints>
      </Section>
      <OrderReview />
    </DefaultLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async () => {
  await searchForm.actions.initialize();
  const shopList = await getNewestShopList(8, null, false);

  return {
    props: {
      data: "data",
      shopList: shopList,
    },
  };
});
