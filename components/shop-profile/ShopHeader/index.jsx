import {
  faAddressBook,
  faLink,
  faMapMarkerAlt,
  faPhone,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Children } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import styled from "styled-components";

import { TAG_TO_COLOR } from "@/components/home/ShopsSection";
import { MaxConstraints } from "@/components/styled/layout";
import Button from "@/components/ui/Button";
import { useFetcher } from "@/modules/dataFetcher";
import media, { OnMobile } from "@/utils/media";

import { reviewsFetcher } from "../modules";
import DetailsModal from "./DetailsModal";
import WhatsAppModal from "./WhatsAppModal";

const Wallpaper = styled.div`
  height: 260px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: #e0e0e0;

  ${media.tablet`
    height: 500px;
  `}
`;

const ShopLogo = styled.div`
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  top: -55px;
  overflow: hidden;

  ${media.tablet`
    top: -105px;
    width: 210px;
    height: 210px;
  `}
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${media.tablet`
    flex-direction: row;
    align-items: flex-start;
  `}
`;

const ShopMeta = styled.div`
  flex-grow: 1;
  margin-top: -40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.tablet`
    margin-left: 50px;
    margin-top: 50px;
    align-items: stretch;
  `}
`;

ShopMeta.FirstRow = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }

  h1 {
    font-size: 30px;
    color: #0d3244;
    font-weight: 500;
    margin-bottom: 0;
    text-align: center;
  }

  tag {
    margin-left: 31px;
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

  > div {
    display: flex;
  }

  h1 {
    font-size: 30px;
    color: #0d3244;
    font-weight: 500;
    margin-bottom: 0;
    text-align: center;
  }

  tag {
    margin-left: 31px;
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

  ${media.tablet`
    h1 {
      text-align: left;
    }
  `}
`;

ShopMeta.SecondRow = styled.div`
  display: flex;
  margin-top: 3px;

  .ant-rate-star:not(:last-child) {
    margin-right: 3px;
  }

  span {
    margin-left: 10px;
  }
`;

ShopMeta.ThirdRow = styled.div`
  font-size: 11px;
  color: #303030;
  font-weight: 400;
  margin-top: 13px;

  d-list {
    display: flex;
    margin: 0 -10px;
  }

  d-term {
    display: block;
    margin-left: 10px;
    color: #ccc;

    .svg-inline--fa {
      margin-right: 5px;
    }
  }

  ${media.tablet`
    display: flex;
  `}
`;

const AdvantagesWrap = styled.div`
  font-size: 11px;
  color: #707070;
  font-weight: 400;
  margin-top: 40px;
  display: none;

  h3 {
    font-size: 12px;
    color: #0d3244;
    font-weight: 500;
  }

  image-wrap {
    min-width: 31px;
    margin-right: 10px;
  }

  advantage {
    display: flex;
    max-width: 160px;
  }

  ${media.tablet`
    display: flex;
  `}
`;

const DetailButtonsWrap = styled.div`
  top: 12px;
  position: absolute;
  right: 0;
  z-index: 100;
  display: flex;
  ${Button} {
    margin-left: 10px;
    height: 35px;
    line-height: 11px;
    min-width: 35px;
    border-radius: 35px;
  }

  ${media.tablet`
    position: static;

    ${Button} {
      height: 51px;
      line-height: 37px;
      min-width: 51px;
      border-radius: 51px;
    }
  `}
`;

const ADVANTAGES = [
  {
    title: "Scherpe reparatie prijzen",
    logo: "/images/shop/wallet.png",
    description: "Transparante prijzen en ook op aanvraag",
  },
  {
    title: "Altijd de beste garantie",
    logo: "/images/shop/star.png",
    description: "Per reparatie zie je hoeveel maanden garantie je krijgt",
  },
  {
    title: "Kwaliteit staat voorop",
    logo: "/images/shop/profile.png",
    description:
      "Wij werken uitsluitend met onderdelen van de hoogste kwaliteit",
  },
  {
    title: "Wordt snel geholpen",
    logo: "/images/shop/gauge.png",
    description: "Door een afspraak te maken weten we dat je komt",
  },
];

export function ContactButton(...props) {
  const router = useRouter();
  const nextLocation = `/${router.query["city"]}/${router.query["shopId][api"]}/${router.query["street"]}/contact`;

  return (
    <Link href={nextLocation}>
      <Button {...props} aria-label="Book service">
        <FontAwesomeIcon icon={faAddressBook} /> Contact
      </Button>
    </Link>
  );
}

export default function ShopHeader({ shop }) {
  const tag = shop.tag;
  const location = [shop.street, shop.city, shop.zipcode]
    .filter(Boolean)
    .join(", ");

  const { data: reviews } = useFetcher({
    dataFetcher: reviewsFetcher,
    identifier: shop.id,
  });

  function renderAdvantage(advantage) {
    return (
      <advantage>
        <image-wrap>
          <Image src={advantage.logo} width="31px" height="26px" />
        </image-wrap>
        <advantage-meta>
          <h3>{advantage.title}</h3>
          <p>{advantage.description}</p>
        </advantage-meta>
      </advantage>
    );
  }

  const shareText = `
    Ik heb  "${shop.name}" gevonden via MrAgain. Heb je een kapot apparaat? Bij MrAgain vind je de beste reparateur bij jou in de buurt
  `.trim();
  const shopURL = typeof window !== "undefined" ? window.location.href : "";
  const detailButtons = (
    <DetailButtonsWrap>
      <DetailsModal shop={shop} />
      <OnMobile show={false}>
        <ContactButton />
      </OnMobile>
      {shop.whatsapp_number && <WhatsAppModal number={shop.whatsapp_number} />}
    </DetailButtonsWrap>
  );

  return (
    <div>
      <Wallpaper>
        {shop?.bg_photo ? (
          <Image
            loading="lazy"
            layout="fill"
            objectFit="contain"
            src={shop.bg_photo}
          />
        ) : null}
      </Wallpaper>
      <MaxConstraints>
        <ContentWrap>
          <ShopLogo>
            {shop?.logo_photo ? (
              <Image
                loading="lazy"
                layout="fill"
                objectFit="contain"
                src={shop.logo_photo}
              />
            ) : null}
          </ShopLogo>
          <OnMobile only>{detailButtons}</OnMobile>
          <ShopMeta>
            <ShopMeta.FirstRow tagColor={TAG_TO_COLOR[tag]}>
              <div>
                <h1>{shop.name}</h1>
                <OnMobile show={false}>
                  {tag ? <tag>{tag}</tag> : null}
                </OnMobile>
              </div>
              <OnMobile show={false}>{detailButtons}</OnMobile>
            </ShopMeta.FirstRow>
            <ShopMeta.SecondRow>
              <Rate
                disabled
                style={{ fontSize: "13px" }}
                value={shop.mark}
                onChange={null}
              />
              <span>{reviews?.length || 0} Reviews</span>
            </ShopMeta.SecondRow>
            <ShopMeta.ThirdRow>
              <d-list>
                <OnMobile show={false}>
                  {shop.phone_number ? (
                    <>
                      <d-term>
                        <FontAwesomeIcon title="phone" icon={faPhone} />
                      </d-term>
                      <d-def>{shop.phone_number}</d-def>
                    </>
                  ) : null}
                  {shop.site_url ? (
                    <>
                      <d-term>
                        <FontAwesomeIcon title="website" icon={faLink} />
                      </d-term>
                      <d-def>{shop.site_url}</d-def>
                    </>
                  ) : null}
                </OnMobile>
                {location ? (
                  <>
                    <d-term>
                      <FontAwesomeIcon title="location" icon={faMapMarkerAlt} />
                    </d-term>
                    <d-def>{location}</d-def>
                  </>
                ) : null}
              </d-list>
            </ShopMeta.ThirdRow>
            <AdvantagesWrap>{ADVANTAGES.map(renderAdvantage)}</AdvantagesWrap>
          </ShopMeta>
        </ContentWrap>
      </MaxConstraints>
    </div>
  );
}
