import {
  faArrowRight,
  faMapMarkerAlt,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import GooglePlaces, { getLongAndLat } from "@/components/common/GooglePlaces";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { API_PATH } from "@/constants";
import Form, { useFormContext } from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import api from "@/utils/api";
import media from "@/utils/media";

import { searchForm } from "../modules";

//

const FindWrap = styled.div`
  height: 568px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  h1 {
    font-size: 50px;
    letter-spacing: -1px;
    line-height: 50px;
    color: #1c2430;
    font-weight: 600;
  }

  ${media.tablet`
    height: 518px;
  `}
`;

const SearchBar = styled.div`
  background-color: #fff;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  padding: 10px 30px;
  border-radius: 10px;
  color: #868686;

  & > div {
    display: flex;
    align-items: center;
    margin-top: 20px;

    ${media.tablet`
      &:nth-child(2) {
        position: relative;
        max-width: 250px;
        right: -20px;
      }
    `}
  }

  & > div ${Field.FieldWrap} {
    width: 100%;
    > * {
      width: 100%;
    }
  }

  .ant-select-selection {
    border: 1px solid #ddd;
  }

  .svg-inline--fa {
    margin-right: 12px;
  }

  ${media.tablet`
    height: 99px;
    padding: 0 30px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    & > div {
      margin-top: 0px;
      flex-grow: 1;
    }
  `}
`;

const SearchWrap = styled.div`
  flex-grow: 1;
  max-width: 600px;
  position: relative;
  z-index: 2;

  h1 {
    margin-top: 160px;
  }

  ${Button} {
    margin-top: 20px;
    margin-bottom: 10px;

    .svg-inline--fa {
      margin-right: 0;
    }

    span {
      display: inline-block;
    }
  }

  ${media.tablet`
    ${Button} {
      min-width: 51px;
      position: relative;
      right: -50px;

      span {
        display: none;
      }
    }
  `}
`;

const FindImage = styled.div`
  position: absolute;
  top: -90px;
  right: -90px;
`;

function SearchButton() {
  const { state } = useFormContext();
  const [currentLocation, setCurrentLocation] = useState({ long: 0, lat: 0 });
  const { zip, device = 0 } = state.values || {};

  useEffect(() => {
    async function effect() {
      const location = await getLongAndLat(state.values.zip);
      return setCurrentLocation(location);
    }

    effect();
  }, [state.values.zip]);

  return (
    <Link
      href={`/zoek-een-reparateur?zip=${zip}&device=${device}&long=${currentLocation.long}&lat=${currentLocation.lat}&distance=15&sort=1`}
    >
      <Button aria-label="Zoek" as="a">
        <span>Zoek</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </Link>
  );
}

export default function FindSection() {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    async function loadData() {
      const data = await api.get(`${API_PATH.GETDEVICES}/`);
      setDevices(data);
    }

    loadData();
  }, []);

  const deviceOptions = useMemo(() => {
    return devices.map((device) => ({
      ...device,
      label: device.device_name,
      value: device.id,
    }));
  }, [devices]);

  return (
    <FindWrap>
      <SearchWrap>
        <h1>Telefoon reparatie zo geregeld</h1>
        <Form module={searchForm}>
          <SearchBar>
            <div>
              <Field
                as={Select}
                name="device"
                size="large"
                options={deviceOptions}
                placeholder={
                  <>
                    <FontAwesomeIcon icon={faMobile} /> Apparaat
                  </>
                }
              />
            </div>
            <div>
              <Field
                as={GooglePlaces}
                size="large"
                prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                name="zip"
              />
            </div>
            <SearchButton />
          </SearchBar>
        </Form>
      </SearchWrap>
      <FindImage>
        <Image
          loading="eager"
          width={671}
          height={603}
          src="/images/find-hero.png"
          alt="vrouw op een stoel"
        />
      </FindImage>
    </FindWrap>
  );
}
