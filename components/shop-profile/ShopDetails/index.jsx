import {
  faCcMastercard,
  faCcVisa,
  faPaypal,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBox,
  faHeadphones,
  faHome,
  faLaptop,
  faMobile,
  faStore,
  faTablet,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useMemo } from "react";
import styled from "styled-components";

import { MaxConstraints } from "@/components/styled/layout";
import { SubTitle } from "@/components/styled/text";
import { store } from "@/configureStore";
import Form, { useFormContext } from "@/modules/forms";
import List, { useListContext } from "@/modules/list";
import media from "@/utils/media";

import { serviceFormModule, shopServicesListModule } from "../modules";

const MainWrap = styled.div`
  background-color: #f3f3f3;

  d-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
  }

  d-term {
    display: block;
    width: 100%;
    padding: 10px 20px 0;
    background-color: #fff;
    font-size: 13px;
    color: #303030;
    font-weight: 500;
    line-height: 27px;
  }

  d-def {
    display: block;
    width: 100%;
    padding: 5px 20px 10px;
    background-color: #fff;
    font-size: 10px;
    color: #707070;
    font-weight: 400;
    margin-bottom: 10px;
  }

  ${SubTitle} {
    margin-bottom: 30px;
  }

  .svg-inline--fa {
    font-size: 21px;
    margin: 0 5px;
    color: #06c987;
  }

  ${media.tablet`
    height: 570px;
    background-color: #fff;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    d-list {
      width: 620px;
      margin: 0;
    }

    d-def, d-term {
      padding: 0;
      width: 50%;
    }

    d-def {
      margin-bottom: 5px;
      line-height: 27px;
    }
  `}
`;

const LocationWrap = styled.div`
  margin: 4px 0;
  line-height: 1;
  .svg-inline--fa {
    font-size: 15px;
    margin: 0 5px 0 0;
    color: #06c987;
  }
`;

const ReparationImageWrap = styled.div`
  width: 430px;
  height: 530px;
  background-color: #fafafa;
  position: relative;
  border-radius: 10px;
  position: relative;
  top: -20px;
  display: none;

  ${media.tablet`
    display: block;
  `}
`;

function ReparationImage() {
  const listItems = useListContext().items;
  const formState = useFormContext().state;
  const selectedReparation = useMemo(() => {
    return listItems.find((item) => item.id === formState.values.service);
  }, [listItems, formState.values]);

  return (
    <ReparationImageWrap>
      {selectedReparation?.reparation?.repair_image ? (
        <Image
          loading="lazy"
          src={selectedReparation.reparation.repair_image}
          layout="fill"
          objectFit="cover"
        />
      ) : null}
    </ReparationImageWrap>
  );
}

export default function ShopDetails({ shop }) {
  return (
    <MainWrap>
      <MaxConstraints>
        <div>
          <SubTitle as="h2">Algemene informatie {shop.name}</SubTitle>
          <d-list>
            <d-term>Apparaten</d-term>
            <d-def>
              <FontAwesomeIcon icon={faMobile} />{" "}
              <FontAwesomeIcon icon={faLaptop} />
              <FontAwesomeIcon icon={faTablet} />{" "}
              <FontAwesomeIcon icon={faTv} />{" "}
              <FontAwesomeIcon icon={faHeadphones} />
            </d-def>
            <d-term>Betaal methoden</d-term>
            <d-def>
              <FontAwesomeIcon icon={faCcVisa} />
              <FontAwesomeIcon icon={faCcMastercard} />
              <FontAwesomeIcon icon={faPaypal} />
            </d-def>
            <d-term>Reparatie opties</d-term>
            <d-def>
              {/*<LocationWrap>
                <FontAwesomeIcon icon={faHome} /> Reparatie op locatie
              </LocationWrap>*/}
              <LocationWrap>
                <FontAwesomeIcon icon={faStore} /> Reparatie in winkel
              </LocationWrap>
              {/* <LocationWrap>
                <FontAwesomeIcon icon={faBox} /> Opsturen
              </LocationWrap>*/}
            </d-def>
            <d-term>Services</d-term>
            <d-def>Mobiele accesoires</d-def>
            <d-term>Vervangend toestel</d-term>
            <d-def>Voor specifieke toestellen</d-def>
            <d-term>Wachtruimte</d-term>
            <d-def>Beschikbaar</d-def>
            <d-term>Merken</d-term>
            <d-def>Apple, Samsung</d-def>
          </d-list>
        </div>
        <Form module={serviceFormModule}>
          <List module={shopServicesListModule}>
            <ReparationImage />
          </List>
        </Form>
      </MaxConstraints>
    </MainWrap>
  );
}
