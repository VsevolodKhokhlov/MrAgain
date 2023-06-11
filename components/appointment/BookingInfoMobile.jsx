import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

import { useFetcher, withData } from "@/modules/dataFetcher";
import Form from "@/modules/forms";

import { SubTitle } from "../styled/text";
import Button from "../ui/Button";
import {
  appointmentForm,
  brandFetcher,
  deviceFetcher,
  modelFetcher,
  serviceFetcher,
} from "./modules";
import UserInfo from "./UserInfo";

//

const MainWrap = styled.div`
  display: flex;
  margin: 0 -20px;
  padding: 0 20px;
  background-color: #f7f7f7;
  height: 117px;
  align-items: center;
  justify-content: space-between;

  h5 {
    font-size: 12px;
    color: #707070;
    font-weight: 300;
    margin-bottom: 14px;
  }

  header {
    height: 71px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin: 0 -41px 30px;
    padding: 0 41px;
  }

  label {
    display: block;
    font-size: 12px;
    color: #707070;
    font-weight: 300;
    margin: 0;
  }

  ${Button} {
    min-width: 51px;
    position: absolute;
    bottom: -25px;
    left: 41px;
  }
`;

const ShopImageWrap = styled.div`
  min-width: 60px;
  height: 60px;
  border-radius: 5px;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
  margin-right: 10px;
`;

const ShopWrap = styled.div`
  display: flex;
`;

const ShopDetails = styled.section`
  font-size: 12px;
  color: #707070;
  font-weight: 400;

  h3 {
    font-size: 15px;
    letter-spacing: 0px;
    color: #0d3244;
    font-weight: 600;
  }
`;

const ServiceDetails = styled.section`
  strong {
    font-size: 12px;
    color: #303030;
    font-weight: 500;
    margin-left: 4px;
  }

  label {
    margin: 0;
  }

  > div {
    display: flex;
  }
`;

const ServiceCostWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  letter-spacing: 0px;
  color: #303030;
  font-weight: 300;
`;

const ServiceDetailsWrap = styled.div`
  display: flex;
  padding-bottom: 22px;
  border-bottom: 3px solid #fafafa;
  margin-bottom: 17px;
`;

const ServiceImage = styled.div`
  width: 51px;
  height: 51px;
  border-radius: 3px;
  padding: 4px;
  border-radius: 4px;
  background-color: #ddd;
  margin-right: 13px;
  position: relative;
`;

const TotalWrap = styled.div`
  position: relative;
  padding-right: 15px;

  .svg-inline--fa {
    font-size: 16px;
    position: absolute;
    top: 50%;
    right: 0;
    color: #06c987;
  }
`;

const DeviceName = withData({
  dataFetcher: deviceFetcher,
  Component({ data }) {
    return data?.device_name || null;
  },
});

const BrandName = withData({
  dataFetcher: brandFetcher,
  Component({ data }) {
    return data?.brand_name || null;
  },
});

const ModelName = withData({
  dataFetcher: modelFetcher,
  Component({ data }) {
    return data?.model_name || null;
  },
});

export default function BookingInfoMobile({ shop, showPrices = true }) {
  const location = [shop.street || "", shop.city || ""]
    .filter(Boolean)
    .join(", ");

  const { data: service } = useFetcher({ dataFetcher: serviceFetcher });

  const content = (
    <>
      {service ? (
        <ServiceDetailsWrap>
          <ServiceImage>
            {service?.reparation?.repair_image ? (
              <Image
                layout="fill"
                objectFit="contain"
                src={service.reparation.repair_image}
              />
            ) : null}
          </ServiceImage>
          <ServiceDetails>
            <div>
              <label>Apparaat:</label>
              <strong>
                <DeviceName />
              </strong>
            </div>
            <div>
              <label>Merk:</label>
              <strong>
                <BrandName />
              </strong>
            </div>
            <div>
              <label>Model:</label>
              <strong>
                <ModelName />
              </strong>
            </div>
          </ServiceDetails>
        </ServiceDetailsWrap>
      ) : null}
      <Form module={appointmentForm}>
        <UserInfo
          showDate={appointmentForm.state?.values?.type !== "contact"}
        />
      </Form>
      {showPrices && service ? (
        <ServiceCostWrap>
          <item>{service?.reparation?.reparation_name}</item>
          <price>&euro;{service?.price}</price>
        </ServiceCostWrap>
      ) : null}
    </>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomLeft"
      overlayClassName="booking-info-mobile-content"
    >
      <MainWrap>
        <ShopWrap>
          <ShopImageWrap>
            {shop.bg_photo ? (
              <Image
                loading="lazy"
                src={shop.bg_photo}
                layout="fill"
                objectFit="cover"
              />
            ) : null}
          </ShopImageWrap>
          <ShopDetails>
            <h3>{shop.name}</h3>
            <location>{location}</location>
          </ShopDetails>
        </ShopWrap>
        {showPrices && service?.price ? (
          <TotalWrap>
            <label>Te betalen bij reparateur</label>
            <price>&euro;{service.price}</price>
            <FontAwesomeIcon icon={faChevronDown} />
          </TotalWrap>
        ) : null}
      </MainWrap>
    </Popover>
  );
}
