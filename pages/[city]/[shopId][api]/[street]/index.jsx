import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import {
  getGeneralShopInfoServer,
  getShopProfileByInformationServer,
} from "service/account/operations";
import styled from "styled-components";

import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/layouts/Homepage";
import GeneralShopInfo from "@/components/shop-profile/GeneralShopInfo";
import ShopDetails from "@/components/shop-profile/ShopDetails";
import ShopHeader from "@/components/shop-profile/ShopHeader";
import ShopServices from "@/components/shop-profile/ShopServices";
import { wrapper } from "@/configureStore";
import { FRONT_END_URL } from "@/constants";
import { OnMobile } from "@/utils/media";

const LoadableReviews = dynamic(
  () =>
    import("@/components/shop-profile/ShopMap").then(
      (module) => module.Reviews
    ),
  {
    loading: Loader,
    ssr: false,
  }
);

const LoadableMap = dynamic(() => import("@/components/shop-profile/ShopMap"), {
  loading: Loader,
  ssr: false,
});

const MainWrap = styled.div`
  background-color: #f3f3f3;
  margin-bottom: -127px;
  max-width: 100%;
  overflow-x: hidden;
`;

const ShopProfile = (routerProps) => {
  const {
    shop_account_profile,
    shopProfileServerInfo,
    shopDevices,
    shopGeneralInfo,
  } = routerProps;

  const router = useRouter();

  let devices =
    shopDevices && shopDevices[0]
      ? shopDevices.map((item) => item.device.device_name)
      : [];
  devices = devices.join(" & ");

  let shopAccountProfile =
    shopProfileServerInfo && shopProfileServerInfo.id
      ? shopProfileServerInfo
      : shop_account_profile;

  let title = `${shopAccountProfile.name} ${shopAccountProfile.city} - ${devices} Telefoon Reparatie - MrAgain.nl`;
  let description = `${shopAccountProfile.name}, ${shopAccountProfile.street}, ${shopAccountProfile.zipcode}, ${shopAccountProfile.city}. Telefoon kapot? Laat je telefoon repareren bij ${shopAccountProfile.name} via mragain.nl. Transparant, betrouwbaar en snel!`;

  const shopSchema = `
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${shopAccountProfile.city}",
        "postalCode": "${shopAccountProfile.zipcode}",
        "streetAddress": "${shopAccountProfile.street}"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "${shopAccountProfile.mark}",
	"bestRating": "5",
	"ratingCount": "21",
	"worstRating": "0"
      },
      "name": "${shopAccountProfile.name}",
      "telephone": "${shopAccountProfile.phone_number}",
      "url": "${shopAccountProfile.site_url}"
    }
  `
    .split(`\n`)
    .join("");

  return (
    <DefaultLayout>
      <Head>
        <title>{title}</title>
        <meta name="Keywords" content="Profiel, MrAgain, Telefoon Reparateur" />
        <meta name="description" content={description} />
        <link rel="canonical" href={FRONT_END_URL + router.asPath} />
        {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
        <meta property="og:type" content="website" />
        <meta name="og_title" property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="og:url" content={FRONT_END_URL + router.asPath} />
        <meta
          property="og:image"
          content={
            shopAccountProfile.bg_photo !== undefined &&
            shopAccountProfile.bg_photo
          }
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: shopSchema }}
        />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <MainWrap>
        <ShopHeader shop={shopProfileServerInfo} />
        <ShopServices shop={shopProfileServerInfo} />
        <OnMobile only>
          <LoadableReviews shop={shopProfileServerInfo} />
        </OnMobile>
        <ShopDetails shop={shopProfileServerInfo} />
        <LoadableMap shop={shopProfileServerInfo} />
        {shopGeneralInfo && (
          <GeneralShopInfo shopGeneralInfo={shopGeneralInfo} />
        )}
      </MainWrap>
    </DefaultLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const shopId = ctx.query["shopId][api"];
  const shopProfileServerInfo = await getShopProfileByInformationServer(shopId);
  const firstShopProfileServerInfo =
    shopProfileServerInfo && shopProfileServerInfo[0]
      ? shopProfileServerInfo[0]
      : shopProfileServerInfo;

  const shopGeneralInfo = await getGeneralShopInfoServer(
    firstShopProfileServerInfo?.id
  );
  return {
    props: {
      shopProfileServerInfo: firstShopProfileServerInfo,
      shopGeneralInfo: shopGeneralInfo?.[0] || null,
    },
  };
});

export default ShopProfile;
