import searchBg from "assets/images/search-bg.png";
import searchBgMobile from "assets/images/search-bg-mobile.png";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { SearchIcon } from "@/assets/icons/SvgIcons";
import GooglePlaces, { getLongAndLat } from "@/components/common/GooglePlaces";
import Button from "@/components/ui/Button";
import Form, { useFormContext } from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import media from "@/utils/media";

import { searchForm } from "./modules";

const FindWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-image: url(${searchBg});
  background-size: cover;
  background-repeat: no-repeat;
  height: 433px;
  width: 100%;
  max-width: 1043px;
  padding: 0 136px;

  @media (max-width: 1117px) {
    padding: 0 32px;
  }

  @media (max-width: 1066px) {
    background-position-x: -200px;
  }

  @media (max-width: 866px) {
    background-position-x: -400px;
  }

  @media (max-width: 652px) {
    background-image: url(${searchBgMobile});
    background-position-x: 0;
    max-width: 382px;
  }

  h3 {
    margin: 0;
    padding: 0 0 24px 0;
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    color: #000000;
    line-height: 1;
  }

  h1 {
    font-style: normal;
    font-weight: 800;
    font-size: 50px;
    color: #000000;
    padding: 0 0 64px 0;
    margin: 0;
    line-height: 1;

    @media (max-width: 866px) {
      max-width: 380px;
    }

    @media (max-width: 652px) {
      padding: 0 0 36px 0;
    }
  }
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

    &:nth-child(2) {
      position: relative;
      max-width: 250px;
      right: -20px;
    }
  }

  & > div ${Field.FieldWrap} {
    width: 100%;
    > * {
      width: 100%;
    }
  }

  .ant-input {
    border: none;
  }

  .ant-select-selection__placeholder {
    padding: 0 !important;
    color: #c0c0c0;
    font-style: italic;
    font-weight: 500;
    font-size: 17px !important;
    margin-left: 0 !important;
  }

  .ant-select-selection__clear {
    top: 10px;
  }

  .ant-select-search__field__wrap {
    input {
      padding: 0 !important;
      color: #c0c0c0;
      font-style: italic;
      font-weight: 500;
      font-size: 17px !important;
      box-shadow: none !important;
    }
  }

  .svg-inline--fa {
    margin-right: 12px;
  }

  height: 72px;
  width: 575px;
  border-radius: 70px;
  padding: 12px 31px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  @media (max-width: 1117px) {
    width: 475px;
  }

  @media (max-width: 652px) {
    width: 350px;
  }

  & > div {
    margin-top: 0px;
    flex-grow: 1;
  }
`;

const SearchWrap = styled.div`
  flex-grow: 1;
  max-width: 661px;
  position: relative;
  z-index: 2;

  ${Button} {
    margin-top: 20px;
    margin-bottom: 10px;

    .svg-inline--fa {
      margin-right: 0;
    }
  }

  a {
    min-width: 48px;
    max-width: 48px;
    height: 48px;
  }

  ${Button} {
    min-width: 48px;
    max-width: 48px;
    height: 48px;
    position: relative;
    right: -19px;
    padding: 15px 0px 19px 0;
  }
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
    <a
      href={`/zoek-een-reparateur?zip=${zip}&device=${device}&long=${currentLocation.long}&lat=${currentLocation.lat}&distance=15&sort=1`}
    >
      <Button aria-label="Zoek" as="a">
        <SearchIcon />
      </Button>
    </a>
  );
}

export default function CitySearch({ title, headline }) {
  return (
    <FindWrap>
      <SearchWrap>
        <h3>{headline}</h3>
        <h1>{title}</h1>
        <Form module={searchForm}>
          <SearchBar>
            <div>
              <Field
                as={GooglePlaces}
                placeholder="Zoek op jouw locatie"
                name="zip"
                isPrefix={false}
              />
            </div>
            <SearchButton />
          </SearchBar>
        </Form>
      </SearchWrap>
    </FindWrap>
  );
}
