import { Button, Icon, Tag } from "antd";
import { find } from "lodash";
import * as moment from "moment";
import Image from "next/image";
import Highlighter from "react-highlight-words";
import styled from "styled-components";

import { Text } from "@/components/common/Text/Text";
import { additionalInfoOptions } from "@/components/templates/shop-management/helpers";

const DeviceDetailsWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  .brand-model {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }
`;

const TagWrapper = styled(Tag)`
  transform: scale(1.1);
`;

export const renderDeviceDetails = (data) => (
  <DeviceDetailsWrapper>
    <div>
      {find(additionalInfoOptions.devices, ["id", data?.device?.id])?.icon && (
        <Image
          width={40}
          height={40}
          src={
            find(additionalInfoOptions.devices, ["id", data?.device?.id])
              ?.icon || ""
          }
        />
      )}
    </div>
    <div className="brand-model">
      <Text.Body weight="bold" style={{ margin: 0 }}>
        {data?.model?.model_name}
      </Text.Body>
      <Text.Body style={{ margin: 0 }}>{data?.brand?.brand_name}</Text.Body>
    </div>
  </DeviceDetailsWrapper>
);

const getGuaranteeStatus = (date, guarantee) => {
  return moment().isAfter(moment(date, "YYYY-MM-DD").add(guarantee, "months"))
    ? "red"
    : "green";
};

export const columns = (viewDetails, search) => [
  {
    width: "120px",
    title: "Datum",
    render(data) {
      return data?.appointment?.date;
    },
  },
  {
    title: "Reparatie",
    width: 150,
    render(data) {
      return <b>{data?.reparation?.reparation_name}</b>;
    },
  },
  {
    title: "Device",
    width: 150,
    render: (data) => renderDeviceDetails(data),
  },
  {
    title: "IMEI/referentie",
    dataIndex: "serialnumber",
    width: 180,
    sorter: (a, b) => a.serialnumber - b.serialnumber,
    render: (serialNumber) => (
      <b>
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[search]}
          autoEscape
          textToHighlight={serialNumber ? serialNumber.toString() : ""}
        />
      </b>
    ),
  },
  {
    title: "Prijs",
    dataIndex: "price",
    width: 150,
    render: (price) =>
      new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(price),
    sorter: (a, b) => +a.price - +b.price,
  },
  {
    title: "Garantie",
    width: 150,
    render(data) {
      return (
        <TagWrapper
          color={getGuaranteeStatus(data?.appointment.date, data?.guarantee)}
        >{`${data?.guarantee} maanden`}</TagWrapper>
      );
    },
    sorter: (a, b) => a.guarantee - b.guarantee,
  },
  {
    title: "",
    width: 50,
    render(data) {
      return (
        <Button type="primary" onClick={() => viewDetails(data)}>
          <Icon type="eye" />
        </Button>
      );
    },
  },
];
