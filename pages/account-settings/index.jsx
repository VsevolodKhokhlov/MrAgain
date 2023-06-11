import { Col, Row, Tabs } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Text } from "@/components/common/Text/Text";
import DefaultLayout from "@/components/layouts/Dashboard";
import { BasicProfile } from "@/components/templates/account-settings/BasicProfile";
import { ChangePassword } from "@/components/templates/account-settings/ChangePassword";
import { MyAddresses } from "@/components/templates/account-settings/MyAddresses";
import {
  basicSettingsForm,
  changePasswordForm,
  currentUser,
} from "@/service/account-settings/modules";
const { TabPane } = Tabs;

export default function RepairManagementPage() {
  const router = useRouter();
  const { userId } = router.query;

  const [activeTab, setActiveTab] = useState("device-manager");

  useEffect(() => {
    async function loadData() {
      const user = await currentUser.fetch();
      await basicSettingsForm.actions.initialize(user?.id);
      await changePasswordForm.actions.initialize();
    }

    loadData();
  }, []);

  const onLocationUpdate = (data) => {
    basicSettingsForm.actions.batchChange({
      updates: {
        street: data.street,
        st_number: data?.st_number,
        zipcode: data.zip,
        city: data.city,
        country: data.country,
      },
    });
  };

  const onTabChange = async (tab) => {
    setActiveTab(tab);
  };

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle"></Row>
      <Tabs defaultActiveKey={activeTab} onChange={onTabChange}>
        <TabPane tab="Algemeen" key="general">
          <Row>
            <Col xxl={{ span: 16 }} lg={{ span: 24 }}>
              <BasicProfile
                basicSettingsForm={basicSettingsForm}
                discardChanges={console.log}
                onSave={console.log}
              />
              <ChangePassword
                changePasswordForm={changePasswordForm}
                discardChanges={console.log}
                onSave={console.log}
              />
            </Col>
            <Col xxl={{ span: 8 }} lg={{ span: 0 }}></Col>
          </Row>
        </TabPane>
        <TabPane tab="Locaties" key="my-address">
          <MyAddresses
            basicSettingsForm={basicSettingsForm}
            discardChanges={console.log}
            onSave={console.log}
            onLocationUpdate={onLocationUpdate}
          />
        </TabPane>
      </Tabs>
    </DefaultLayout>
  );
}
