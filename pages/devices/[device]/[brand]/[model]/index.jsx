import { faArrowRight, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Radio } from "antd";
import RadioGroup from "antd/lib/radio/group";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import querystring from "querystring";
import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import { ModelImages } from "@/components/devices/ModelImages";
import {
  appointmentFormModule,
  modelFetcher,
  modelReparationsFetcher,
} from "@/components/devices/modules";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { H1, H2, SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import { FRONT_END_URL } from "@/constants";
import Form, { useFormContext } from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import media, { OnMobile } from "@/utils/media";

const WhiteBackground = styled.div`
  background-color: #fff;
`;

const IntroWrap = styled.div`
  display: flex;
  font-size: 12px;
  letter-spacing: 1px;
  color: #a0a0a0;
  font-weight: 300;
  flex-direction: column;

  info {
    font-size: 12px;
    color: #303030;
    font-weight: 300;

    svg {
      color: #eaeaea;
      margin-right: 16px;
    }
  }

  ${media.tablet`
    padding: 50px 0;
    flex-direction: row;
  `}
`;

const DescriptionWrap = styled.div`
  padding: 20px 0;
  margin-top: 20px;
  border-top: 2px solid #fafafa;
  font-size: 16px;
  color: #000000;
  font-weight: 300;
`;

const MobileToolbar = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  background-color: #fff;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 0 27px rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 110;
  left: 0;
  justify-content: center;
  align-items: center;

  ${Button} {
    padding: 7px 22px;
    height: 37px;
    line-height: 23px;
    box-shadow: 0 0 8px #06c987;

    &[disabled] {
      box-shadow: 0 0 8px #a0a0a0;
    }
  }
`;

const ServicesSection = styled.section`
  padding-top: 50px;

  .ant-radio-group {
    width: 100%;
    display: block;
  }

  ${SubTitle} {
    margin-bottom: 40px;
  }
`;

const ReparationWrap = styled.div`
  height: 90px;
  display: flex;
  border-radius: 8px;
  align-items: center;
  background-color: #fff;
  margin: 12px 0;
  padding: 0 25px;
  justify-content: space-between;

  ${Button} {
    display: none;
    position: relative;
    right: -50px;
    min-width: 51px;
  }

  ${media.tablet`
    ${Button} {
      display: inline-block;
    }

    .ant-radio {
      display: none;
    }
  `}
`;

ReparationWrap.FirstCell = styled.div`
  display: flex;
  align-items: center;
`;

ReparationWrap.LastCell = styled.div`
  display: flex;
  align-items: center;

  label {
    font-size: 10px;
    color: #a0a0a0;
    font-weight: 400;
    display: block;
  }

  price {
    font-size: 15px;
    letter-spacing: 0px;
    color: #505050;
    font-weight: 400;
  }
`;

const RepairImageWrap = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  padding: 10px;
  border-radius: 25px;
  display: none;

  > div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  ${(props) =>
    props.hasImage &&
    css`
      border: 1px solid #ddd;
    `}

  ${media.tablet`
    display: block;
  `}
`;

function MobileAppointmentButton({ searchUrlData }) {
  const { state } = useFormContext();
  const service = state?.values?.service;
  const urlData = querystring.stringify({
    ...searchUrlData,
    service,
  });

  return (
    <OnMobile only>
      <MobileToolbar>
        <Link href={`/zoek-een-reparateur?${urlData}`}>
          <Button disabled={!service} as="a">
            Bekijk reparateurs
          </Button>
        </Link>
      </MobileToolbar>
    </OnMobile>
  );
}

export default function ModelPage({ data, reparations }) {
  const searchUrlData = {
    device: data.brand.device.id,
    brand: data.brand.id,
    model: data.id,
  };

  useEffect(() => {
    appointmentFormModule.actions.initialize();
  }, []);

  function renderReparation(data) {
    const urlData = querystring.stringify({
      ...searchUrlData,
      service: data.id,
    });

    return (
      <ReparationWrap>
        <ReparationWrap.FirstCell>
          <RepairImageWrap hasImage={!!data.repair_image}>
            <div>
              {data.repair_image ? (
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={data.repair_image}
                />
              ) : null}
            </div>
          </RepairImageWrap>
          <Radio value={data.id}>{data.reparation_name}</Radio>
        </ReparationWrap.FirstCell>
        <ReparationWrap.LastCell>
          {data.price[0] ? (
            <div>
              <label>Prijs vanaf</label>
              <price>&euro;{data?.price?.[0]}</price>
            </div>
          ) : null}
          <Link href={`/zoek-een-reparateur?${urlData}`}>
            <Button as="a">
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Link>
        </ReparationWrap.LastCell>
      </ReparationWrap>
    );
  }

  let title = `${data.brand.brand_name} ${data.model_name} reparatie`;
  let description = `Ben je op zoek naar ${data.brand.brand_name} ${data.model_name} reparatie? Via MrAgain zie je direct wie hem voor je kan
repareren en plan je direct een afspraak in.`;
  let h1_header = `${data.model_name} reparatie`;

  return (
    <DefaultLayout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <WhiteBackground>
        <MaxConstraints>
          <IntroWrap>
            <ModelImages data={data.model_photo} />
            <div>
              <SubTitle>{data.brand.brand_name}</SubTitle>
              <H1>{h1_header}</H1>
              <p>{data.model_serie_number}</p>
              <info>
                <FontAwesomeIcon icon={faCalendar} /> Released op{" "}
                {moment(data.model_year).format("DD-MM-YYYY")}
              </info>
              <DescriptionWrap>{data.model_info}</DescriptionWrap>
            </div>
          </IntroWrap>
        </MaxConstraints>
      </WhiteBackground>
      <ServicesSection>
        <MaxConstraints>
          <SubTitle>
            ALLE {data.brand.brand_name} {data.model_name} REPARATIES
          </SubTitle>
          <Form module={appointmentFormModule}>
            <Field name="service" as={RadioGroup}>
              {reparations.map(renderReparation)}
            </Field>
          </Form>
        </MaxConstraints>
      </ServicesSection>
      <Form module={appointmentFormModule}>
        <MobileAppointmentButton searchUrlData={searchUrlData} />
      </Form>
    </DefaultLayout>
  );
}

export const getServerSideProps = async (req) => {
  const model = req.query.model;
  const data = await modelFetcher.fetch(model);
  const reparations = await modelReparationsFetcher.fetch(model);
  return {
    props: {
      data,
      reparations,
    },
  };
};
