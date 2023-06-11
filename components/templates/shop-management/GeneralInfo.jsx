import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "antd";
import { Rate } from "antd";
import Image from "next/image";
import React, { useState } from "react";

import Link from "@/assets/icons/link.svg";
import MapMarker from "@/assets/icons/map-marker.svg";
import Phone from "@/assets/icons/phone.svg";
import GooglePlaces from "@/components/common/GooglePlaces";
import { Text } from "@/components/common/Text/Text";
import Input from "@/components/ui/Input";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import { shopManagementGeneralForm } from "@/service/shop-management/modules";

import {
  AdvantagesWrap,
  ContactInfo,
  PaddingWrapper,
  rowStyle,
} from "./styles";

const ADVANTAGES = [
  {
    title: "Klaar terwijl u wacht",
    logo: "/images/shop/wallet.png",
    description: "De meeste reparaties zijn binnen 30 minuten klaar",
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

function renderAdvantage(advantage, index) {
  return (
    <span key={`advantage-${index}`}>
      <image-wrap>
        <Image src={advantage.logo} width="31px" height="26px" />
      </image-wrap>
      <advantage-meta>
        <h3>{advantage.title}</h3>
        <p>{advantage.description}</p>
      </advantage-meta>
    </span>
  );
}

export const GeneralInfo = ({ shopData, setShopData }) => {
  const [editing, setEditing] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    (async () => {
      await shopManagementGeneralForm.actions.submit(
        shopManagementGeneralForm.state.values
      );
      setShopData({
        ...shopData,
        ...shopManagementGeneralForm.state.values,
      });
      setEditing(false);
    })();
    
  };

  const onEdit = async () => {
    setEditing(true);
    await shopManagementGeneralForm.actions.initialize();
  };

  return (
    <>
      {editing ? (
        <PaddingWrapper>
          <Form module={shopManagementGeneralForm} onSubmit={onSubmit}>
            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <h3>About the company</h3>
                <p>
                  Give a brief introduction to let your clients know more about
                  you.
                </p>
              </Col>
              <Col span={18}>
                <Field
                  adminInput
                  as={Input}
                  customLabel
                  textarea
                  name="about_us"
                  label="Over ons"
                />
              </Col>
            </Row>
            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <h3>Contact informatie</h3>
                <p>Laat bezoekers weten hoe ze je kunnen bereiken.</p>
              </Col>
              <Col span={18}>
                <Field
                  adminInput
                  as={Input}
                  customLabel
                  name="phone_number"
                  label="Telefoonnummer"
                />
                <Field
                  adminInput
                  as={Input}
                  customLabel
                  name="site_url"
                  label="Website"
                />
                <Field
                  adminInput
                  customLabel
                  name="whatsapp_number"
                  label="Whatsapp Number"
                />
              </Col>
            </Row>

            <Row type="flex" justify="space-between" align="middle">
              <Col />
              <Col>
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() => setEditing(false)}
                >
                  Annuleren
                </Button>
                <Button type="primary" htmlType="submit">
                  Opslaan
                </Button>
              </Col>
            </Row>
          </Form>
        </PaddingWrapper>
      ) : (
        <>
          <PaddingWrapper>
            <Row type="flex" justify="space-between" align="middle">
              <Col>
                <Text.Headline>{shopData?.name}</Text.Headline>
              </Col>
              <Col>
                <Button type="primary" onClick={onEdit}>
                  Wijzig
                </Button>
              </Col>
            </Row>
            <Row>
              <div>
                <Rate disabled allowHalf value={Math.ceil(shopData?.mark)} />
              </div>
              <ContactInfo>
                <span>
                  <Image width="24px" height="24px" src={Phone} />
                  <Text.Body size="12" style={{ margin: 0 }}>
                    {shopData?.phone_number}
                  </Text.Body>
                </span>
                <span>
                  <Image width="24px" height="24px" src={Link} />
                  <Text.Body size="12" style={{ margin: 0 }}>
                    {shopData?.site_url}
                  </Text.Body>
                </span>
                <span>
                  <Image width="24px" height="24px" src={MapMarker} />
                  <Text.Body size="12" style={{ margin: 0 }}>
                    {shopData?.street}
                  </Text.Body>
                </span>
                <span>
                  <FontAwesomeIcon icon={faWhatsapp} />
                  &nbsp;
                  <Text.Body size="12" style={{ margin: 0 }}>
                    {shopData?.whatsapp_number}
                  </Text.Body>
                </span>
              </ContactInfo>
            </Row>
          </PaddingWrapper>
          <AdvantagesWrap>{ADVANTAGES.map(renderAdvantage)}</AdvantagesWrap>
        </>
      )}
    </>
  );
};
