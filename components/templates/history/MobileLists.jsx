import { Col, Icon, Row } from "antd";
import * as moment from "moment";
import React, { useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import styled from "styled-components";

import { Text } from "@/components/common/Text/Text";
import { renderDeviceDetails } from "@/components/templates/history/helpers";

export const BoxElement = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  margin: 5px 0;
`;

export const BoxHeader = styled.div`
  background: white;
  height: fit-content;
  border: ${(props) =>
    props.selected ? "1px solid #06c987" : "1px solid #ddd"};
  border-radius: 10px;
  height: 80px;
  overflow: hidden;
`;

export const BoxContent = styled.div`
  position: absolute;
  background: #fafafa;
  z-index: -1;
  top: 70px;
  width: 100%;
  height: 0;
  overflow: hidden;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const Separator = styled.div`
  width: 2px;
  height: 80px;
  background: #f0f0f0;
  position: relative;
`;

const GuaranteeDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 4px);
  left: -3px;
  background: #4caf50;
`;

const GuaranteeBox = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
`;

const Center = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  flex-direction: column;

  p {
    margin: 0 !important;
  }
`;

export const MoreIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 28px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const getGuaranteeStatusColor = (date, guarantee, type) => {
  if (moment().isAfter(moment(date, "YYYY-MM-DD").add(guarantee, "months"))) {
    return type === "dot" ? "#4caf50" : "rgba(76, 175, 80, 0.1)";
  } else {
    return type === "dot" ? "#ED5556" : "rgba(237, 85, 86, 0.1)";
  }
};

const ListItem = ({
  data,
  index,
  style,
  selectedItem,
  setSelectedItem,
  viewMore,
}) => {
  return (
    <BoxElement
      style={{
        ...style,
        top: index > selectedItem ? style.top + 190 : style.top,
        height: index === selectedItem ? style.height + 200 : style.height,
      }}
    >
      <MoreIcon onClick={() => viewMore(data[index])}>
        <Icon type="eye" />
      </MoreIcon>
      <BoxHeader
        selected={selectedItem === index}
        onClick={() =>
          setSelectedItem(selectedItem === index ? undefined : index)
        }
      >
        <Row type="flex" justify="space-arround" style={{ height: "80px" }}>
          <Col span={10}>
            <Center>
              <Text.Body lineHeight="16">
                {data[index]?.appointment?.date}
              </Text.Body>
            </Center>
          </Col>
          <Col span={2}>
            <Separator>
              <GuaranteeDot
                style={{
                  background: getGuaranteeStatusColor(
                    data[index]?.appointment?.date,
                    data[index]?.guarantee,
                    "dot"
                  ),
                }}
              />
            </Separator>
          </Col>
          <Col span={10}>
            <Center>
              <Text.Body weight="bold">{data[index].serialnumber}</Text.Body>
              <Text.Body lineHeight="16">
                {data[index]?.reparation?.reparation_name}
              </Text.Body>
            </Center>
          </Col>
        </Row>
      </BoxHeader>
      <BoxContent style={{ height: selectedItem === index ? 200 : 0 }}>
        <div style={{ padding: "30px 20px 20px 20px" }}>
          <Row>
            <Col span={12}>
              <Text.Body lineHeight="16" upperCase>
                Warranty
              </Text.Body>
              <Text.Body lineHeight="16" weight="bold">
                {data[index].guarantee} months
              </Text.Body>
            </Col>
            <Col span={12}>
              <Text.Body lineHeight="16" upperCase>
                Price
              </Text.Body>
              <Text.Body lineHeight="16" weight="bold">
                {data
                  ? new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(data[index]?.price)
                  : ""}
              </Text.Body>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span={24}>
              <Text.Body lineHeight="16">Device details</Text.Body>
              {renderDeviceDetails(data[index])}
            </Col>
          </Row>
        </div>
        <GuaranteeBox
          style={{
            background: getGuaranteeStatusColor(
              data[index]?.appointment?.date,
              data[index]?.guarantee,
              "box"
            ),
          }}
        >
          <Text.Body
            style={{
              color: getGuaranteeStatusColor(
                data[index]?.appointment?.date,
                data[index]?.guarantee,
                "dot"
              ),
              margin: 0,
            }}
          >
            {moment().isAfter(
              moment(data[index]?.appointment?.date, "YYYY-MM-DD").add(
                data[index]?.guarantee,
                "months"
              )
            )
              ? "Valid"
              : "Invalid"}{" "}
            Warranty
          </Text.Body>
        </GuaranteeBox>
      </BoxContent>
    </BoxElement>
  );
};

export const MobileList = ({ data, viewDetails }) => {
  const [selectedItem, setSelectedItem] = useState(undefined);

  const viewMore = (item) => {
    viewDetails(item);
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          itemCount={data.length}
          itemSize={100}
          width={width}
          itemData={data}
        >
          {({ data, index, style }) =>
            ListItem({
              data,
              index,
              style,
              selectedItem,
              setSelectedItem,
              viewMore,
            })
          }
        </List>
      )}
    </AutoSizer>
  );
};
