import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import styled from "styled-components";

import Loader from "@/components/common/Loader/index.js";
import { ShopCard } from "@/components/home/ShopsSection";
import { useListContext } from "@/modules/list";
import media, { OnMobile } from "@/utils/media.js";

import GoogleMap from "./GoogleMap.jsx";

const Menu = dynamic(() => import("react-horizontal-scrolling-menu"), {
  loading: Loader,
  ssr: false,
});

const MapWrap = styled.div`
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  > div {
    position: sticky;
    top: 0;
    height: 100vh !important;
    z-index: 10;
  }

  ${media.tablet`
    position: relative;
    min-width: 550px;
  `}
`;

const ShopList = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 60px;
  z-index: 11;
  width: 100%;

  ${media.tablet`
    display: none;
  `}
`;

export default function Map({ selectedShop, updateSelectedShop }) {
  const { state = {} } = useListContext();
  const { items, pages } = state;

  const shopList = useMemo(() => {
    if (!pages || !items) {
      return [];
    }

    return pages.reduce((accumulator, page) => {
      return accumulator.concat(items[page].map((item) => item.shop));
    }, []);
  }, [items, pages]);

  const selectedShopEntity = useMemo(() => {
    return shopList.find((shop) => shop.id === selectedShop);
  }, [shopList, selectedShop]);

  const menuData = useMemo(() => {
    return shopList.map((shop) => (
      <ShopCard
        key={shop.id}
        shop={shop}
        onClick={() => updateSelectedShop(shop.id)}
      />
    ));
  }, [shopList]);

  return (
    <MapWrap>
      <div>
        <OnMobile only>
          <ShopList>
            {selectedShopEntity ? (
              <Menu
                alignCenter={false}
                data={menuData}
                selected={selectedShop}
                hideArrows={true}
              />
            ) : null}
          </ShopList>
        </OnMobile>
        <GoogleMap
          shopList={shopList}
          selectedShopId={selectedShop}
          onMarkerClick={(shop) => {
            updateSelectedShop(shop.id);
          }}
          onClick={() => {
            updateSelectedShop(null);
          }}
        ></GoogleMap>
      </div>
    </MapWrap>
  );
}
