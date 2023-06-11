import { Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import { Text } from "@/components/common/Text/Text";
import DefaultLayout from "@/components/layouts/Dashboard";
import { AdditionalInfo } from "@/components/templates/shop-management/AdditionalInfo";
import { GeneralInfo } from "@/components/templates/shop-management/GeneralInfo";
import { ImageSection } from "@/components/templates/shop-management/ImageSection";
import { OperationalHoursCalendar } from "@/components/templates/shop-management/OperationalHoursCalendar";
import { ScheduleList } from "@/components/templates/shop-management/ScheduleList";
import { BoxWrapper } from "@/components/templates/shop-management/styles";
import {
  currentUser,
  deleteNonRegularHours,
  getShopNonWorkingDays,
  getValidOpenTime,
  saveShopNonWorkingDays,
  saveValidOpenTime,
  shopInfoFetcher,
  shopManagementAdditionalForm,
  shopManagementGeneralInfo,
} from "@/service/shop-management/modules";
import { OnMobile } from "@/utils/media";

const { TabPane } = Tabs;

export default function ShopManagementPage() {
  const [activeTab, setActiveTab] = useState("profile-settings");
  const [shopInfo, setShopInfo] = useState(null);
  const [shopData, setShopData] = useState();
  const [nonWorkingDays, setNonWorkingDays] = useState();
  const [validOpenTime, setValidOpenTime] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    async function loadData() {
      const user = await currentUser.fetch();
      setUser(user);
      setShopData(await shopManagementGeneralInfo.fetch());
      setNonWorkingDays(await getShopNonWorkingDays.fetch());
      setValidOpenTime(await getValidOpenTime.fetch());
      const shopInfoData = await shopInfoFetcher.fetch();
      if (shopInfoData && shopInfoData.length){
        setShopInfo(shopInfoData[0]);
      }
    }
    loadData();
  }, []);

  const onTabChange = async (tab) => {
    setActiveTab(tab);
  };

  const onNonWorkingDaysSaved = async (data) => {
    await saveShopNonWorkingDays(data);
    setNonWorkingDays(await getShopNonWorkingDays.fetch());
  };

  const onDeleteNonWorkingDays = async (id) => {
    deleteNonRegularHours(id);
    setNonWorkingDays(await getShopNonWorkingDays.fetch());
  };

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle"></Row>
      <OnMobile only>
        <h5>
          <b>Profiel beheer is nog niet beschikbaar op je mobiel.</b>
        </h5>
      </OnMobile>
      <OnMobile show={false}>
        <Tabs defaultActiveKey={activeTab} onChange={onTabChange}>
          <TabPane tab="Profiel" key="profile-settings">
            <>
              <ImageSection shopData={shopData} authUser={user} />
              <Row>
                <Col span={4}></Col>
                <Col span={20}>
                  <BoxWrapper>
                    <GeneralInfo
                      shopData={shopData}
                      setShopData={setShopData}
                    />
                  </BoxWrapper>
                  <BoxWrapper padding>
                    {
                      shopInfo && 
                      <AdditionalInfo
                        shopData={shopInfo}
                        setShopData={setShopInfo}
                    />}
                  </BoxWrapper>
                </Col>
              </Row>
            </>
          </TabPane>
          <TabPane tab="Openingstijden" key="operational-hours">
            <Row gutter={[40, 40]} type="flex">
              <Col xxl={{ span: 14, order: 1 }} xs={{ span: 24, order: 2 }}>
                {nonWorkingDays && (
                  <OperationalHoursCalendar
                    nonWorkingDays={nonWorkingDays}
                    onNonWorkingDaysSaved={onNonWorkingDaysSaved}
                    onDeleteNonWorkingDays={onDeleteNonWorkingDays}
                  />
                )}
              </Col>
              <Col
                xxl={{ span: 10, order: 2 }}
                xs={{ span: 24, order: 1 }}
                style={{ height: "fit-content" }}
              >
                <ScheduleList
                  validOpenTime={validOpenTime}
                  onSave={saveValidOpenTime}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </OnMobile>
    </DefaultLayout>
  );
}
