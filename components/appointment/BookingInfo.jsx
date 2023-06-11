import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  max-width: 364px;
  width: 100%;
  padding: 0 41px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 52px;
  align-self: flex-start;
  border: 1px solid #ddd;
  position: relative;

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
    margin-bottom: 14px;
  }

  ${Button} {
    min-width: 51px;
    position: absolute;
    bottom: -25px;
    left: 41px;
  }
`;

const ShopDetails = styled.section`
  font-size: 12px;
  color: #707070;
  font-weight: 400;
  padding-bottom: 22px;
  border-bottom: 3px solid #fafafa;
  margin-bottom: 17px;

  h3 {
    font-size: 15px;
    color: #303030;
    font-weight: 500;
    margin: 0;
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
  background-color: #f0f0f0;
  display: flex;
  height: 101px;
  margin: 20px -41px 0;
  padding: 0 41px 30px;
  align-items: center;
  justify-content: space-between;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  label {
    font-size: 14px;
    color: #303030;
    font-weight: 500;
    margin: 0;
  }

  price {
    font-size: 17px;
    color: #000000;
    font-weight: 500;
  }
`;

const ButtonWrapper = styled(Button)`
  padding: 0 14px;
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

export default function BookingInfo({
  shop,
  isLastStep,
  nextStep,
  showPrices = true,
  title = "Afspraak gegevens",
  finalButtonLabel = "Bevestig",
}) {
  const location = [shop.street || "", shop.city || ""]
    .filter(Boolean)
    .join(", ");

  const { data: service } = useFetcher({ dataFetcher: serviceFetcher });

  return (
    <MainWrap>
      <header>
        <SubTitle>{title}</SubTitle>
      </header>
      <label>Reparateur informatie</label>
      <ShopDetails>
        <h3>{shop.name}</h3>
        <location>{location}</location>
      </ShopDetails>
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
        <>
          <ServiceCostWrap>
            <item>{service?.reparation?.reparation_name}</item>
            <price>&euro;{service?.price}</price>
          </ServiceCostWrap>
          <TotalWrap>
            <label>Te betalen bij reparateur</label>
            <price>&euro;{service?.price}</price>
          </TotalWrap>
        </>
      ) : null}
      <ButtonWrapper onClick={nextStep} aria-label="Next step">
        {isLastStep ? (
          <span>{finalButtonLabel}</span>
        ) : (
          <>
            <FontAwesomeIcon icon={faArrowRight} />
          </>
        )}
      </ButtonWrapper>
    </MainWrap>
  );
}
