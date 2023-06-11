import {
  faArrowRight,
  faMapMarkerAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";

import SliderOnMobile from "@/components/common/SliderOnMobile";
import { H2, SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import media from "@/utils/media";
import { getShopLogo, getShopRoute } from "@/utils/shop";

const ShopList = styled.div`
  margin: 0 -15px;
`;

export const TAG_TO_COLOR = {
  new: "#c90648",
  populair: "#ffd342",
  "best price": "#0076a3",
  "Repair on location": "#0076a3",
  "Repair on shop": "#c90648",
  "Reparatie op locatie": "#0076a3",
  "Fysieke winkel": "#c90648",
};

const ShopWrap = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 25px 15px;
  width: 203px;
  height: 205px;
  border-radius: 15px;
  background-color: #fff;
  padding: 0 15px;
  position: relative;

  a {
    font-size: 11px;
    color: #404040;
    font-weight: 400;
    margin: 0;
  }

  p {
    font-size: 9px;
    letter-spacing: 0px;
    line-height: 11px;
    color: #707070;
    font-weight: 300;
    font-style: italic;
  }

  location {
    font-size: 9px;
    letter-spacing: 0px;
    line-height: 11px;
    color: #707070;
    font-weight: 300;
    display: block;

    .svg-inline--fa {
      color: #ddd;
      margin-right: 4px;
    }
  }

  price {
    letter-spacing: 1px;
    line-height: 11px;
    font-weight: 400;
    text-align: right;
    display: block;
    font-size: 11px;
  }

  ${Button} {
    position: absolute;
    bottom: -10px;
    right: 10px;
    min-width: 26px;
    line-height: 12px;
    height: 26px;
    font-size: 8px;
    color: #fff;
  }
`;

const ShopDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const ShopImageWrap = styled.div`
  width: 203px;
  height: 152px;
  border-radius: 15px;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
  margin: 0 -15px;

  d-def {
    display: block;
    position: absolute;
    bottom: 6px;
    left: 6px;
    font-size: 10px;
  }

  rating {
    background-color: #fff;
    width: 31px;
    height: 31px;
    display: inline-block;
    border-radius: 16px;

    text-align: center;
    line-height: 31px;

    .svg-inline--fa {
      color: #ffd342;
    }
  }

  tag {
    margin-left: 8px;
    display: inline-block;
    height: 31px;
    ${(props) =>
      props.tagColor &&
      css`
        background-color: ${props.tagColor || "#ddd"};
      `}
    color: #fff;
    line-height: 31px;
    padding: 0 10px;
    border-radius: 15px;
    text-transform: uppercase;
  }
`;

const Toolbar = styled.div`
  height: 33px;
  border-bottom: 2px solid #f0f0f0;
  display: none;
  justify-content: space-between;
  align-items: center;

  ${media.tablet`
    display: flex;
  `}

  filter-by {
    font-size: 13px;
    /* color: #303030; */
    color: #a0a0a0;
    font-weight: 400;
    margin: 0 17px;
    cursor: pointer;
  }
  .view-all {
    color: #06c987;

    .svg-inline--fa {
      margin-left: 5px;
      font-size: 7px;
    }
  }
`;

export function ShopCard({ shop, onClick }) {
  const location = [shop.city || "", shop.country || ""]
    .filter(Boolean)
    .join(", ");

  const shopUrl = getShopRoute(shop);
  const shopLogo = getShopLogo(shop.logo_photo);

  return (
    <ShopWrap key={shop.id} onClick={onClick}>
      <ShopImageWrap tagColor={TAG_TO_COLOR[shop.tag]}>
        <Image
          loading="lazy"
          src={shopLogo}
          alt={shop.name}
          layout="fill"
          objectFit="contained"
        />
        <d-def>
          {shop.rating !== undefined ? (
            <rating>
              {shop.rating} <FontAwesomeIcon icon={faStar} />
            </rating>
          ) : null}
          {shop.tag ? <tag>{shop.tag}</tag> : null}
        </d-def>
      </ShopImageWrap>
      <ShopDetails>
        <div>
          <Link href={shopUrl}>
            <a>{shop.name}</a>
          </Link>
        </div>
        <div>
          <price>{shop.price || ""}</price>
        </div>
      </ShopDetails>
      {location ? (
        <location>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          {location}
        </location>
      ) : null}
      <Link href={shopUrl}>
        <Button as="a" aria-label={`Visit ${shop.name}`}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </Link>
    </ShopWrap>
  );
}

function renderShop(shop) {
  return <ShopCard shop={shop} />;
}

export default function ShopsSection({ shopList = [] } = {}) {
  return (
    <>
      <SubTitle>Aangesloten reparateurs</SubTitle>
      <H2>Nieuw</H2>
      <Toolbar>
        <div>
          <filter-by hidden>Alles</filter-by>
          <filter-by hidden>Featured</filter-by>
          <filter-by hidden>Populair</filter-by>
          <filter-by hidden>Beste prijs</filter-by>
          <filter-by hidden>Nieuw</filter-by>
        </div>
        <div>
          <Link href="/zoek-een-reparateur">
            <a className="view-all">
              Laad meer <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </Link>
        </div>
      </Toolbar>
      <ShopList>
        <SliderOnMobile tabletConfig={{ rows: 2, slidesPerRow: 3 }}>
          {shopList.map(renderShop)}
        </SliderOnMobile>
      </ShopList>
    </>
  );
}
