import GoogleMapReact from "google-map-react";
import React, { useMemo } from "react";
const googleMapsApiKey = "AIzaSyBE2P-vg2-gzleHsoAYa7pesL7CLpPpISE";
import styled, { css } from "styled-components";

import colors from "./map-colors.json";

const ShopMarkerWrap = styled.div`
  position: relative;
  top: -12px;
  left: -14px;

  ${(props) =>
    props.selected &&
    css`
      top: -40px;
      left: -40px;
    `}
`;

function ShopMarker({ selected, ...props }) {
  let imageProps = {
    src: "/images/map/marker.png",
    width: "23px",
    height: "27px",
  };

  if (selected) {
    imageProps = {
      src: "/images/map/marker-selected.png",
      width: "80px",
      height: "80px",
    };
  }

  return (
    <ShopMarkerWrap {...props} selected={selected}>
      <img {...imageProps} />
    </ShopMarkerWrap>
  );
}

function MapComponent({
  shopList = [],
  onMarkerClick,
  onClick,
  selectedShopId,
  defaultCenter = { lat: 51.363244, lng: 5.264762 },
  defaultZoom = 7,
}) {
  const selectedShopEntity = useMemo(() => {
    return shopList.find((shop) => shop.id === selectedShopId);
  }, [shopList, selectedShopId]);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: googleMapsApiKey }}
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      onClick={onClick}
      {...(selectedShopEntity
        ? { center: [selectedShopEntity.geo_lat, selectedShopEntity.geo_long] }
        : {})}
      options={{ styles: colors }}
    >
      {shopList.map((shop) => (
        <ShopMarker
          key={shop.id}
          selected={shop.id === selectedShopId}
          lat={shop.geo_lat}
          lng={shop.geo_long}
          {...shop}
          onClick={onMarkerClick && onMarkerClick.bind(null, shop)}
        />
      ))}
    </GoogleMapReact>
  );
}

export default MapComponent;
