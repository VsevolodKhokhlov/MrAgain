import { Layout } from "antd";
import React from "react";

import Footer from "../footer/Footer";
import Header from "../header/Header";
const { Content } = Layout;

const LayoutComponent = (props) => {
  const { children } = props;

  return (
    <Layout className="App" theme="light">
      <Header />
      <Content className="App-content">{children}</Content>
      <Footer />
    </Layout>
  );
};

export default LayoutComponent;
