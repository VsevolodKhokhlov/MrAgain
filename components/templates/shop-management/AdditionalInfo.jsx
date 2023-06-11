import { Button, Col, Divider, Row, Switch, Tag } from "antd";
import { find } from "lodash";
import React, { useEffect, useState } from "react";

import { MultiSelect } from "@/components/common/MultiSelect";
import { SwitchGroup } from "@/components/common/SwitchGroup";
import { Text } from "@/components/common/Text/Text";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import {
  currentUser,
  getBrands,
  getDevices,
  getReparations,
  getPurchases,
  shopManagementAdditionalForm,
} from "@/service/shop-management/modules";

import { additionalInfoOptions } from "./helpers";
import { HeaderSmallText, rowStyle } from "./styles";

const reparationLocationOptions = [
  {
    value: 1,
    label: "Reparatie in de winkel",
  },
  {
    value: 2,
    label: "Reparatie op locatie",
  },
  {
    value: 3,
    label: "Toestel opsturen",
  },
];

const parkingAreaOptions = [
  { value: 1, label: "Ja, betaald parkeren."},
  { value: 2, label: "Ja, gratis parkeren"},
  { value: 3, label: "Nee"}
];

const renderDevicesList = (devices, selectedDevices, onChange) => (
  <Row gutter={[16, 16]}>
    {devices.map((device, index) => (
      <Col span={12} key={`device-${index}`}>
        <SwitchGroup
          title={device.device_name}
          description={device.synonyms}
          defaultChecked={selectedDevices?.includes(device.id)}
          onChange={(value) => onChange(device.id, value)}
        />
      </Col>
    ))}
  </Row>
);

export const AdditionalInfo = ({ shopData, setShopData }) => {
  const [editing, setEditing] = useState(false);
  const [brands, setBrands] = useState([]);
  const [devices, setDevices] = useState([]);
  const [reparations, setReparations] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await currentUser.fetch();
      await shopManagementAdditionalForm.actions.initialize(user.account_id);
      const fetchedBrands = await getBrands.fetch();
      setReparations(await getReparations.fetch());
      setDevices(await getDevices.fetch());
      setBrands(fetchedBrands);
      setPurchases(await getPurchases.fetch());
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (shopData) {
      setSelectedDevices(shopData.replacementDevices);
    }
  }, [shopData]);

  if (!shopData) {
    return <div>DATA MISSING</div>;
  }

  const onDeviceSelected = (id, value) => {
    let newSelectedDevices = [...selectedDevices];
    if (newSelectedDevices?.includes(id) && value === false) {
      newSelectedDevices.splice(newSelectedDevices.indexOf(id), 1);
    } else if (!newSelectedDevices?.includes(id)) {
      newSelectedDevices = [...newSelectedDevices, id];
    }
    shopManagementAdditionalForm.actions.batchChange({
      updates: {
        devices: newSelectedDevices,
      },
    });
    setSelectedDevices(newSelectedDevices);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    (async () => {
      await shopManagementAdditionalForm.actions.submit(
        shopManagementAdditionalForm.state.values
      );

      setShopData({
        ...shopData,
        ...shopManagementAdditionalForm.state.values,
        cateredBrand: shopManagementAdditionalForm.state.values?.brands?.map(
          (b) => parseInt(b)
        ),
        paymentMethod: shopManagementAdditionalForm.state.values?.payMethod,
        replacementDevices: shopManagementAdditionalForm.state.values?.devices,
        ShopPurchase: shopManagementAdditionalForm.state.values?.purchases.map(
          (b) => parseInt(b)
        ),
      });

      setEditing(false);
    })();
  };

  const onEdit = async () => {
    setEditing(true);
    await shopManagementAdditionalForm.actions.initialize(shopData?.shop_id);
  };

  return (
    <>
      {editing ? (
        <Form module={shopManagementAdditionalForm} onSubmit={onSubmit}>
          <Row type="flex" justify="space-between" align="middle">
            <Col>
              <HeaderSmallText>Algemene informatie</HeaderSmallText>
            </Col>
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
          <Divider />
          <Row style={rowStyle} type="flex" justify="space-between">
            <Col span={6}>
              <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                Apparaten
              </Text.Body>
            </Col>
            <Col span={18}>
              <div>
                {renderDevicesList(
                  devices,
                  shopData.replacementDevices,
                  onDeviceSelected
                )}
              </div>
            </Col>
          </Row>

          <Row style={rowStyle} type="flex" justify="space-between">
            <Col span={6}>
              <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                Merken
              </Text.Body>
            </Col>
            <Col span={18}>
              <Field
                adminInput
                as={MultiSelect}
                name="brands"
                options={brands.map((item) => ({
                  value: item.id.toString(),
                  label: item.brand_name,
                }))}
              />
            </Col>
          </Row>

          <Row style={rowStyle} type="flex" justify="space-between">
            <Col span={6}>
              <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                Betaal methoden
              </Text.Body>
            </Col>
            <Col span={18}>
              <Field
                adminInput
                as={MultiSelect}
                name="payMethod"
                options={additionalInfoOptions.paymentMethods}
              />
            </Col>
          </Row>
          <Row style={rowStyle} type="flex" justify="space-between">
            <Col span={6}>
              <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                Locatie opties
              </Text.Body>
            </Col>
            <Col span={18}>
              <Row gutter={[0, 16]}>
                <Field
                  adminInput
                  as={MultiSelect}
                  name="reparationOption"
                  options={reparationLocationOptions}
                />
              </Row>
            </Col>
          </Row>

          <Row style={rowStyle} type="flex" justify="space-between">
            <Col span={6}>
              <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                Beschikbare reparaties
              </Text.Body>
            </Col>
            <Col span={18}>
              <Field
                adminInput
                as={MultiSelect}
                name="purchases"
                options={purchases.map((purchase) => ({
                  label: purchase.purchaseName,
                  value: purchase.id,
                }))}
              />
            </Col>
          </Row>

          <Row style={rowStyle} type="flex" justify="space-between">
            <Col span={6}>
              <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                Parking Area
              </Text.Body>
            </Col>
            <Col span={18}>
              <Field
                adminInput
                as={MultiSelect}
                name="parkingArea"
                options={parkingAreaOptions.map((option) => ({
                  label: option?.label,
                  value: option?.value,
                }))}
              />
            </Col>
          </Row>
          <Row style={rowStyle} type="flex" justify="space-between">
            <Col span={6}>
              <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                Vervangend toestel
              </Text.Body>
            </Col>
            <Col span={18}>
              <Field
                adminInput
                simple
                as={Switch}
                defaultChecked={shopData?.temporaryReplacement}
                name="temporaryReplacement"
              />
            </Col>
          </Row>

          <Row style={rowStyle} type="flex" justify="space-between">
            <Col span={6}>
              <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                Wachtruimte
              </Text.Body>
            </Col>
            <Col span={18}>
              <Field
                adminInput
                simple
                as={Switch}
                defaultChecked={shopData.waitingArea === "No" ? false : true}
                name="waitingArea"
              />
            </Col>
          </Row>

          <Row style={rowStyle} type="flex" justify="space-between">
            <Col span={6}>
              <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                Insurance
              </Text.Body>
            </Col>
            <Col span={18}>
              <Field
                adminInput
                simple
                as={Switch}
                defaultChecked={shopData.insurance}
                name="insurance"
              />
            </Col>
          </Row>
        </Form>
      ) : (
        <div>
          <Form module={shopManagementAdditionalForm} onSubmit={onSubmit}>
            <Row type="flex" justify="space-between" align="middle">
              <Col>
                <HeaderSmallText>Algemene informatie</HeaderSmallText>
              </Col>
              <Col>
                <Button type="primary" onClick={onEdit}>
                  Wijzigen
                </Button>
              </Col>
            </Row>
            <Divider />
            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                  Apparaten
                </Text.Body>
              </Col>
              <Col span={18}>
                <div>
                  {devices
                    .filter((device) =>
                      shopData?.replacementDevices?.includes(device?.id || 0)
                    )
                    .map((device) => {
                        return (
                          <img
                            width="40px"
                            height="40px"
                            src={device?.device_image || ""}
                          />
                        );

                      return <></>;
                    })}
                </div>
              </Col>
            </Row>

            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                  Merken
                </Text.Body>
              </Col>
              <Col span={18}>
                <div>
                  {brands
                    .filter((brand) =>
                      shopData?.cateredBrand?.includes(brand.id)
                    )
                    .map((brand) => (
                      <Tag color="green">{brand.brand_name}</Tag>
                    ))}
                </div>
              </Col>
            </Row>

            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                  Betaal methoden
                </Text.Body>
              </Col>
              <Col span={18}>
                <div>
                  {additionalInfoOptions.paymentMethods
                    .filter((item) =>
                      shopData?.paymentMethod?.includes(item.value)
                    )
                    .map((item) => (
                      <Tag color="blue">{item.label}</Tag>
                    ))}
                </div>
              </Col>
            </Row>

            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                  Locatie opties
                </Text.Body>
              </Col>
              <Col span={18}>
                {shopData?.reparationOption.map((id) => (
                  <Tag color="green">
                    {find(reparationLocationOptions, ["value", +id])?.label}
                  </Tag>
                ))}
              </Col>
            </Row>

            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                  Beschikbare reparaties
                </Text.Body>
              </Col>
              <Col span={18}>
                <div>
                  {purchases
                    .filter((shopPurchase) =>
                      shopData?.ShopPurchase.includes(shopPurchase.id)
                    )
                    .map((shopPurchase) => (
                      <Tag color="green">{shopPurchase.purchaseName}</Tag>
                    ))}
                </div>
              </Col>
            </Row>

            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                  Parking Area
                </Text.Body>
              </Col>
              <Col span={18}>
                <div>
                  {parkingAreaOptions
                    .filter((option) =>
                      shopData?.parkingArea.includes(option.value?.toString())
                    )
                    .map((option) => (
                      <Tag color="green">{option.label}</Tag>
                    ))}
                </div>
              </Col>
            </Row>
            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                  Vervangend toestel
                </Text.Body>
              </Col>
              <Col span={18}>
                {shopData?.temporaryReplacement ? "Ja" : "Nee"}
              </Col>
            </Row>
            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                  Wachtruimte
                </Text.Body>
              </Col>
              <Col span={18}>{shopData?.waitingArea ? "Yes" : "No"}</Col>
            </Row>
            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
                  Insurance
                </Text.Body>
              </Col>
              <Col span={18}>{shopData?.insurance ? "Yes" : "No"}</Col>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};
