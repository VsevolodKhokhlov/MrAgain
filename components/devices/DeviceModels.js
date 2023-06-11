import React, { useMemo } from "react";
import styled from "styled-components";

import media from "@/utils/media";

const ModelsWrap = styled.div`
  background-color: #fff;
  border-radius: 10px;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 35px 30px;

  ${media.tablet`
    padding: 70px 60px;

    > a {
      max-width: 30%;
    }
  `}
`;

const ModelLink = styled.a`
  font-size: 15px;
  color: #303030;
  font-weight: 500;
  width: 240px;
  line-height: 47px;
  border-bottom: 1px solid #fafafa;
  margin: 0 20px;
`;

export default function DeviceModels({
  models,
  brandName,
  searchTerm,
  deviceName,
}) {
  const filteredModels = useMemo(() => {
    if (searchTerm) {
      return models.filter((model) =>
        model.model_name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }

    return models.filter(
      (model) => model.brand_slug === brandName && model.slug === deviceName
    );
  }, [models, brandName, searchTerm]);

  function renderModel(model) {
    return (
      <ModelLink
        href={`/devices/${model.slug}/${model.brand_slug}/${model.model_slug}`}
      >
        {model.model_name}
      </ModelLink>
    );
  }

  return <ModelsWrap>{filteredModels.map(renderModel)}</ModelsWrap>;
}
