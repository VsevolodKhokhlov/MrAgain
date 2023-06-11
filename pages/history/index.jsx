import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Divider, Input, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Text } from "@/components/common/Text/Text";
import DefaultLayout from "@/components/layouts/Dashboard";
import { columns } from "@/components/templates/history/helpers";
import { MobileList } from "@/components/templates/history/MobileLists";
import { ViewRecord } from "@/components/templates/history/ViewRecord";
import {
  currentUser,
  reparationsList,
  viewRecordModal,
} from "@/service/history/modules";
import { OnMobile } from "@/utils/media";

import ArrowSVG from "../../assets/icons/ReactSVGIcons/ArrowSVG";

const StyledTable = styled(Table)`
  .ant-table-head {
    background: #fafafa;
  }
  .ant-table-thead > tr > th {
    font-size: 12px;
    color: #909090;
    font-weight: 400;
    border-bottom: 0;
  }

  .ant-table-tbody > tr > td {
    font-size: 12px;
    font-weight: 400;
  }

  .ant-table-tbody {
    border-radius: 10px;
    overflow: hidden;
    background: white;
  }
`;

const MobileContent = styled.div`
  height: calc(100vh - 260px);
`;

const AntdInput = styled(Input)`
  .ant-input-suffix {
    right: 4px;
  }
  .arrow-svg {
    margin-left: 5px;
  }
  font-size: 12px;
`;

export default function HistoryPage({ auth_user }) {
  const [loading, setLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInputFocus, setSearchInputFocus] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    async function loadData() {
      await currentUser.fetch();
      const { items } = await reparationsList.actions.initialize();
      setHistoryItems(items);
      setLoading(false);
    }

    setLoading(true);
    loadData();
  }, []);

  const onSearch = (value) => {
    setSearch(value);
  };

  const handleOnRowsSelected = (keys, items) => console.log(keys, items);

  const viewDetails = (data) => {
    setSelectedItem(data);
    viewRecordModal.actions.open();
  };

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle">
        <Col />
      </Row>
      <Row type="flex" justify="end">
        <Col lg={{ span: 7 }} md={{ span: 24 }}>
          <AntdInput
            placeholder="Zoek op IMEI / referentie"
            size="large"
            allowClear
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            prefix={<SearchOutlined className="site-form-item-icon" />}
            suffix={<ArrowSVG searchInputFocus={searchInputFocus} />}
            onFocus={() => {
              setSearchInputFocus(true);
            }}
            onBlur={() => {
              setSearchInputFocus(false);
            }}
          />
        </Col>
        <Col></Col>
      </Row>
      <Divider />
      <OnMobile only>
        <MobileContent>
          <MobileList
            viewDetails={viewDetails}
            data={historyItems.filter((data) =>
              data.serialnumber.includes(search)
            )}
          />
        </MobileContent>
      </OnMobile>
      <OnMobile show={false}>
        <StyledTable
          loading={loading}
          dataSource={historyItems.filter((data) =>
            data.serialnumber.includes(search)
          )}
          columns={columns(viewDetails, search)}
          onRowsSelected={handleOnRowsSelected}
          selection
          pagination
        />
      </OnMobile>
      <ViewRecord data={selectedItem} viewRecordModal={viewRecordModal} />
    </DefaultLayout>
  );
}
