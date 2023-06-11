import Head from "next/head";
import React, { useState } from "react";

import { DeviceFinder } from "@/components/devices/DeviceFinder";
import DeviceModels from "@/components/devices/DeviceModels";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { API_PATH } from "@/constants";
import { FRONT_END_URL } from "@/constants";
import api from "@/utils/api";

export default function Devices({ models, deviceName, brandName }) {
  const [searchTerm, updateSearchTerm] = useState("");

  let title = `${brandName} ${deviceName} reparatie | MrAgain`;
  let description = `Op zoek naar ${brandName} ${deviceName} Vind snel een reparateur via MrAgain en laat je ${deviceName} repareren via mragain.nl. Transparant, betrouwbaar en snel!`;
  let url = `${FRONT_END_URL}/devices/${deviceName}/${brandName}`;

  return (
    <DefaultLayout>
      <Head>
        <title>{title}</title>
        <meta name="Keywords" content="Profiel, MrAgain, Telefoon Reparateur" />
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
        <meta property="og:type" content="website" />
        <meta name="og_title" property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="og:url" content={url} />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <MaxConstraints>
        <DeviceFinder
          models={models}
          deviceName={deviceName}
          brandName={brandName}
          searchTerm={searchTerm}
          onSearch={updateSearchTerm}
        />
        <DeviceModels
          models={models}
          deviceName={deviceName}
          brandName={brandName}
          searchTerm={searchTerm}
        />
      </MaxConstraints>
    </DefaultLayout>
  );
}

export async function getServerSideProps(ctx) {
  const deviceName = ctx.query.device;
  const brandName = ctx.query.brand;
  const models = await api.get(`${API_PATH.ALL_MODELS}/`);
  return {
    props: {
      models,
      deviceName,
      brandName,
    },
  };
}
