import { Col, Divider, Row } from "antd";
import { filter, uniqBy } from "lodash";
import { find } from "lodash";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { Text } from "@/components/common/Text/Text";
import DefaultLayout from "@/components/layouts/Dashboard";
import { EditModal } from "@/components/templates/repair-management/EditModal";
import { ModelTransfer } from "@/components/templates/repair-management/ModelTransfer";
import { additionalInfoOptions } from "@/components/templates/shop-management/helpers";
import {
  currentUser,
  editRepairModelModal,
  getAllModels,
  getRepairBrandModel,
  getRepairDevices,
  saveModelReparations,
  saveSelectedModels,
  saveShopReparations,
} from "@/service/repair-management/modules";
import { OnMobile } from "@/utils/media";
const DeviceItemWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .device-info {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
  }

  .synonyms {
    font-weight: lighter;
    font-size: 12px;
  }
`;

export default function RepairManagementPage() {
  const [targetKeys, setTargetKeys] = useState([]);
  const [devices, setDevices] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedBrandId, setSelectedBrandId] = useState();
  const [user, setUser] = useState();
  const [shopReparations, setShopReparations] = useState([]);

  useEffect(() => {
    async function loadData() {
      const user = await currentUser.fetch();
      setUser(user);
      const fetchedDevices = await getRepairDevices.fetch();
      const allModels = await getAllModels.fetch();
      const firstModel = {
        id: allModels[0].brand.id,
        key: `${fetchedDevices[0].id}-${allModels[0].brand.brand_name}`,
      };

      const currentModels = await getRepairBrandModel.fetch();
      setDevices(
        fetchedDevices.map((device) => {
          const icon = find(additionalInfoOptions.devices, ["id", device.id]);
          return {
            title: (
              <DeviceItemWrapper>
                <div className="device-icon">
                  {icon ? (
                    <Image width={40} height={40} src={icon.icon} />
                  ) : null}
                </div>
                <div className="device-info">
                  <div>
                    <b>{device.device_name}</b>
                  </div>
                  <div className="synonyms">{device?.synonyms}</div>
                </div>
              </DeviceItemWrapper>
            ),
            key: device.id,
            id: device.id,
            selectable: false,
            children: uniqBy(
              allModels
                .filter((model) => model.brand.device_id === device.id)
                .map((model) => ({
                  key: `${device.id}-${model.brand.brand_name}`,
                  title: model.brand.brand_name,
                  id: model.brand.id,
                  image: model.brand.brand_image,
                })),
              "key"
            ),
          };
        })
      );

      const selectedModels = currentModels.map((model) =>
        model.model_id.toString()
      );
      const mappedModels = allModels.map((model) => ({
        model: model.model_name,
        key: model.id.toString(),
        id: model.id,
        brand_id: model.brand_id,
        model_id: model.id,
      }));
      setModels(mappedModels.filter((model) => model !== undefined));
      setTargetKeys(selectedModels);
      setSelectedModels(filter(models, ["brand_id", firstModel.id]));

      setSelectedBrand(firstModel);
    }

    loadData();
  }, []);

  const handleOnBrandSelected = async (brandId) => {
    setSelectedBrandId(brandId);
    setSelectedModels(filter(models, ["brand_id", brandId]));
  };

  const onChange = (key) => {
    if (targetKeys.includes(key)) {
      const newTargetKeys = [...targetKeys];
      newTargetKeys.splice(newTargetKeys.indexOf(key), 1);
      setTargetKeys(newTargetKeys);
    } else {
      setTargetKeys([...targetKeys, key]);
    }
  };

  const onEditModelReparations = async (deviceId, item) => {
    setSelectedModel(item);
    setShopReparations(
      await saveModelReparations.fetch({
        deviceId: deviceId,
        brandId: item.brand_id,
        modelId: item.id,
      })
    );
    editRepairModelModal.actions.open();
  };

  const onRepairModelSaved = (items) => {
    saveShopReparations(items);
  };

  const handleOnModelsSaved = useCallback(
    (selectedDevice) => {
      const savingData = [
        {
          brand_id: selectedBrandId,
          models: selectedModels
            .filter((item) => targetKeys.includes(item.key))
            .map((item) => item.id),
        },
      ];
      const payload = {
        brand: savingData,
        device_id: selectedDevice,
      };
      saveSelectedModels(payload);
    },
    [selectedModels, selectedBrandId, targetKeys]
  );

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle"></Row>
      <OnMobile only>
        <h5>
          <b>Profiel beheer is nog niet beschikbaar op je mobiel.</b>
        </h5>
      </OnMobile>
      <OnMobile show={false}>
        <Divider />
        <ModelTransfer
          shopId={user?.id}
          data={selectedModels}
          targetKeys={targetKeys}
          onChange={onChange}
          menuItems={devices}
          onBrandSelected={handleOnBrandSelected}
          selectedBrand={selectedBrand}
          onEditModelReparations={onEditModelReparations}
          onModelsSaved={handleOnModelsSaved}
        />
        <EditModal
          editRepairModelModal={editRepairModelModal}
          item={selectedModel}
          data={shopReparations}
          onSave={onRepairModelSaved}
        />
      </OnMobile>
    </DefaultLayout>
  );
}
