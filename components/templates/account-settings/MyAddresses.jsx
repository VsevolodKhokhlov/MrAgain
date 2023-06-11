import { Button, Col, Divider, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";

import GooglePlaces from "@/components/common/GooglePlaces";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";

import {
  BoxWrapper,
  BoxWrapperContent,
  ButtonsWrapper,
  HeaderSmallText,
  HoursEditor,
  RowWrapper,
} from "./styles";

const DURATION_OPTIONS = [
  {
    label: "30 minutes",
    value: 30,
  },
  {
    label: "60 minutes",
    value: 60,
  },
  {
    label: "90 minutes",
    value: 90,
  },
  {
    label: "1 dag",
    value: 1,
  },
];

const LOCATIONS_OPTIONS = [
  { label: "Fysieke werkplaats", value: "1" },
  {
    label: "Mobiele werkplaats (reparatie op locatie)",
    value: "2",
  },
  { label: "Allebei", value: "1,2" },
];

export const MyAddresses = ({ basicSettingsForm, onLocationUpdate }) => {
  const handleOnLocationSelected = (geo) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo.lat},${geo.long}&key=AIzaSyBE2P-vg2-gzleHsoAYa7pesL7CLpPpISE`
      )
      .then((res) => {
        if (res.data.results.length !== 0) {
          const data = {
            city: "",
            st_number: "",
            street: "",
            country: "",
            zip: "",
          };
          res.data.results[0].address_components.forEach((comp) => {
            if (comp.types.includes("route")) {
              data.street = comp.long_name;
            }
            if (comp.types.includes("street_number")) {
              data.st_number = comp.long_name;
            }
            if (comp.types.includes("country")) {
              data.country = comp.long_name;
            }
            if (comp.types.includes("locality")) {
              data.city = comp.long_name;
            }
            if (comp.types.includes("postal_code")) {
              data.zip = comp.long_name;
            }
          });
          onLocationUpdate(data);
        }
      });
  };

  return (
    <BoxWrapper>
      <RowWrapper>
        <Col lg={6} xs={0}>
          <HoursEditor>
            <HeaderSmallText>Mijn locaties</HeaderSmallText>
            <Divider></Divider>
            <BoxWrapperContent>
              <Row>
                <Col>
                  <h4>Hoofd locatie</h4>
                  <p>Fysieke winkel</p>
                </Col>
              </Row>
            </BoxWrapperContent>
          </HoursEditor>
        </Col>
        <Col lg={18} xs={24}>
          <Form module={basicSettingsForm}>
            <BoxWrapperContent paddingY>
              <Row>
                <Col xxl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 24 }}>
                  <Field
                    adminInput
                    name="shop_type"
                    as={Select}
                    placeholder="Kies je locatie type"
                    label="Locatie type"
                    size="small"
                    customLabel
                    options={LOCATIONS_OPTIONS}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 0]}>
                <Col xxl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }}>
                  <Field
                    adminInput
                    name="city"
                    as={GooglePlaces}
                    label="Stad"
                    onLocationSelected={handleOnLocationSelected}
                    customLabel
                    searchOptions={{
                      componentRestrictions: {
                        country: ["nl", "be"],
                      },
                      types: ["(cities)"],
                    }}
                    size="small"
                  />
                </Col>
                <Col xxl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }}>
                  <Field
                    name="street"
                    adminInput
                    as={GooglePlaces}
                    label="Straat"
                    customLabel
                    onLocationSelected={handleOnLocationSelected}
                    searchOptions={{
                      componentRestrictions: {
                        country: ["nl", "be"],
                      },
                      types: ["address"],
                    }}
                    size="small"
                  />
                </Col>
              </Row>
              <Col>
                <Row gutter={[16, 0]}>
                  <Col xxl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }}>
                    <Field
                      adminInput
                      name="zipcode"
                      as={Input}
                      label="Postcode"
                      customLabel
                      size="small"
                    />
                  </Col>
                  <Col xxl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }}>
                    <Field
                      adminInput
                      name="st_number"
                      as={Input}
                      disabled={!basicSettingsForm.state?.values?.zipcode}
                      label="Huisnummer"
                      customLabel
                      size="small"
                    />
                  </Col>
                </Row>
              </Col>
              {/* <Row>
                <Col xxl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 24 }}>
                  <Field
                    adminInput
                    name="intervals"
                    as={Select}
                    label="Tijd per afspraak"
                    size="small"
                    options={DURATION_OPTIONS}
                    allowClear
                  />
                </Col>
              </Row> */}
            </BoxWrapperContent>
            <Divider />
            <ButtonsWrapper>
              <div />
              <Button type="primary" htmlType="submit">
                Wijzigingen opslaan
              </Button>
            </ButtonsWrapper>
          </Form>
        </Col>
      </RowWrapper>
    </BoxWrapper>
  );
};
