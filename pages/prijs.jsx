import "./prijs.less";

import React from "react";

import { Layout } from "@/components/global";
import CreateAccountCard1 from "@/components/price/create-account-card/CreateAccountCard1";
import CreateAccountCard2 from "@/components/price/create-account-card/CreateAccountCard2";
import CreateAccountCard3 from "@/components/price/create-account-card/CreateAccountCard3";

const Price = () => {
  return (
    <Layout>
      <div className="price-container">
        <div className="price-container-wrap">
          <CreateAccountCard1
            color="green"
            price="19,95"
            type={0}
          ></CreateAccountCard1>
          <CreateAccountCard2
            color="orange"
            price="19,95"
            type={0}
          ></CreateAccountCard2>
          <CreateAccountCard3
            color="black"
            price="19,95"
            type={0}
          ></CreateAccountCard3>
        </div>
      </div>
    </Layout>
  );
};

export default Price;
