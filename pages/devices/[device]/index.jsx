import Head from "next/head";
import React, { useState } from "react";

import { DeviceFinder } from "@/components/devices/DeviceFinder";
import DeviceModels from "@/components/devices/DeviceModels";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { API_PATH } from "@/constants";
import { FRONT_END_URL } from "@/constants.js";
import api from "@/utils/api";

export default function Devices({ models, deviceName }) {
  const [searchTerm, updateSearchTerm] = useState("");

  let title = `${deviceName} reparatie - MrAgain.nl`;
  let description = `Op zoek naar ${deviceName} reparatie? Via MrAgain zie je direct wie je device kan maken!`;
  let url = `${FRONT_END_URL}/devices/${deviceName}`;

  return (
    <DefaultLayout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta name="og_title" property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="og:url" property="og:url" content={url} />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <MaxConstraints>
        <DeviceFinder
          models={models}
          deviceName={deviceName}
          searchTerm={searchTerm}
          onSearch={updateSearchTerm}
        />
        {searchTerm ? (
          <DeviceModels models={models} searchTerm={searchTerm} />
        ) : null}
      </MaxConstraints>
    </DefaultLayout>
  );
}

export async function getServerSideProps(ctx) {
  const deviceName = ctx.query.device;
  const models = await api.get(`${API_PATH.ALL_MODELS}/`);
  return {
    props: {
      models,
      deviceName,
    },
  };
}
