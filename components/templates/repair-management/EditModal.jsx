import { Button, Col, Divider, Row, Switch, Table } from "antd";
import { cloneDeep } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

import Input from "@/components/ui/Input";
import { Drawer } from "@/modules/modal";

import { HeaderSmallText, RowWrapperMargin } from "./styles";

const columns = (onChange) => [
  {
    title: "Reparatie",
    dataIndex: "reparation.reparation_name",
  },
  {
    title: "Prijs",
    dataIndex: "price",
    width: 150,
    render(price, record, index) {
      return (
        <Input
          defaultValue={price}
          onChange={(value) => onChange(index, "price", value)}
          addonBefore="€"
          type="number"
        />
      );
    },
  },
  {
    title: "Garantie",
    dataIndex: "guarantee_time",
    width: 200,
    render(guarantee_time, record, index) {
      return (
        <Input
          defaultValue={guarantee_time}
          onChange={(value) => onChange(index, "guarantee_time", value)}
          type="number"
          addonAfter="maanden"
        />
      );
    },
  },
  {
    title: "Reparatie tijd",
    dataIndex: "reparation_time",
    width: 200,
    render(reparation_time, record, index) {
      return (
        <Input
          defaultValue={reparation_time}
          onChange={(value) => onChange(index, "reparation_time", value)}
          addonAfter="minuten"
          type="number"
        />
      );
    },
  },
  {
    title: "Actief",
    dataIndex: "active",
    render(active, record, index) {
      return (
        <Switch
          defaultChecked={active}
          onChange={(value) => onChange(index, "active", value)}
        />
      );
    },
  },
];

export const EditModal = ({ item, data, editRepairModelModal, onSave }) => {
  let [items, setItems] = useState([]);
  useEffect(() => {
    setItems(cloneDeep(data));
  }, [data]);

  const onClose = () => {
    setItems([]);
  };

  const onChange = useCallback(
    (index, obj, value) => {
      const newItems = [...items];
      newItems.map((item, itemIndex) => {
        if (itemIndex === index) {
          item[obj] = value;
        }

        return item;
      });
      setItems(newItems);
    },
    [items]
  );

  return (
    <Drawer
      width="1000px"
      module={editRepairModelModal}
      destroyOnClose
      onClose={onClose}
    >
      <h2 style={{ marginBottom: "30px" }}>Model informatie</h2>
      <HeaderSmallText>Device</HeaderSmallText>
      <Divider />
      <Row type="flex" justify="space-between">
        <Col>
          <h3>
            <b>{item?.model}</b>
          </h3>
        </Col>
      </Row>
      <Divider />
      <RowWrapperMargin type="flex" justify="space-between" align="center">
        <Col>
          <HeaderSmallText>Reparaties</HeaderSmallText>
        </Col>
        <Col></Col>
      </RowWrapperMargin>
      <Divider />
      <Table
        style={{ minHeight: `calc(100vh - 360px)` }}
        scroll={{ y: `calc(100vh - 420px)` }}
        dataSource={cloneDeep(items)}
        columns={columns(onChange)}
        pagination={false}
      />
      <RowWrapperMargin type="flex" justify="space-between" align="center">
        <Col>
          <Button onClick={() => editRepairModelModal.actions.close()}>
            Annuleer
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => onSave(items)}>
            Opslaan
          </Button>
        </Col>
      </RowWrapperMargin>
    </Drawer>
  );
};
