import "./ServiceTable.less";

import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setLoadService } from "service/search/action.js";

const ServiceTable = (routerProps) => {
  const [services, setServices] = useState([]);
  const { isLoadService, setLoadService, modelServices } = routerProps;

  useEffect(() => {
    if (isLoadService === true) {
      setServices(modelServices);
      setLoadService(false);
    }
  }, [isLoadService, modelServices, setLoadService]);

  function displayServiceTable() {
    let columns = [
      {
        title: "Reparatie",
        dataIndex: "service",
        key: "service",
        width: "45%",
      },
      {
        title: "Prijs (incl.BTW)",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Garantie (maanden)",
        dataIndex: "guarantee",
        key: "guarantee",
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={services}
        scroll={{ y: 278 }}
        pagination={false}
      />
    );
  }
  return <div className="shop-service-table">{displayServiceTable()}</div>;
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  modelServices: state.search.modelServices,
  isLoadService: state.search.isLoadService,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    setLoadService: (data) => {
      dispatch(setLoadService(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTable);
