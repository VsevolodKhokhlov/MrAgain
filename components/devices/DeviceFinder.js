import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";

import { H2, SubTitle } from "@/components/styled/text";
import { StyledInput } from "@/components/ui/Input";
import media from "@/utils/media";

const SearchWrap = styled.div`
  padding: 80px 0 40px;
  display: flex;
  flex-direction: column;

  ${media.tablet`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  `}
`;

const BrandsList = styled.div`
  padding: 20px 0;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  margin-top: 10px;
`;

const DevicesList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DeviceWrap = styled.a`
  background-color: rgb(241, 254, 250);
  color: rgb(6, 201, 135);
  padding: 0px 15px;
  line-height: 40px;
  border-radius: 10px;
  margin: 5px;
  font-size: 13px;

  &:hover {
    background-color: #06c987;
    color: #fff;
    text-decoration: none;
  }

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #06c987;
      color: #fff;
    `}
`;

const BrandWrap = styled.a`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 30px;
  margin: 4px;
  font-size: 15px;
  color: #303030;
  font-weight: 700;

  ${(props) =>
    props.isSelected &&
    css`
      box-shadow: 0 0 0 2px #06c987;
    `}

  ${media.tablet`
    margin: 9px;
    width: 255px;
  `}
`;

const BrandsInnerWrap = styled.div`
  margin: 0 -10px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: content-box;
`;

export function DeviceFinder({
  models,
  deviceName,
  brandName,
  searchTerm,
  onSearch,
}) {
  const deviceTypes = useMemo(() => {
    return models.reduce((accumulator, model) => {
      if (accumulator.find((existing) => existing.name === model.device_name)) {
        return accumulator;
      }
      accumulator.push({
        name: model.device_name,
        id: model.device_id,
        slug: model.slug,
      });

      return accumulator;
    }, []);
  }, [models]);

  const brands = useMemo(() => {
    return models.reduce((accumulator, model) => {
      if (model.slug !== deviceName) {
        return accumulator;
      }

      if (accumulator.find((existing) => existing.name === model.brand_name)) {
        return accumulator;
      }
      accumulator.push({
        name: model.brand_name,
        id: model.brand_id,
        slug: model.brand_slug,
      });

      return accumulator;
    }, []);
  }, [models]);

  function renderDevice(brand) {
    return (
      <DeviceWrap
        href={`/devices/${brand.slug}`}
        key={brand.id}
        isSelected={deviceName === brand.slug}
      >
        {brand.name}
      </DeviceWrap>
    );
  }

  function renderBrand(brand) {
    return (
      <BrandWrap
        href={`/devices/${deviceName}/${brand.slug}`}
        key={brand.id}
        isSelected={brandName === brand.name}
      >
        {brand.name}
      </BrandWrap>
    );
  }

  return (
    <>
      <SearchWrap>
        <div>
          <SubTitle>Alle apparaten</SubTitle>
          <H2>Vind je apparaat</H2>
        </div>
        <div>
          <StyledInput
            prefix={<FontAwesomeIcon icon={faSearch} />}
            placeholder="Apparaat of model"
            value={searchTerm}
            onChange={(ev) => onSearch(ev.target.value)}
          />
        </div>
      </SearchWrap>
      {!searchTerm ? (
        <>
          <DevicesList>{deviceTypes.map(renderDevice)}</DevicesList>
          {deviceName ? (
            <BrandsList>
              <BrandsInnerWrap>{brands.map(renderBrand)}</BrandsInnerWrap>
            </BrandsList>
          ) : null}
        </>
      ) : null}
    </>
  );
}
