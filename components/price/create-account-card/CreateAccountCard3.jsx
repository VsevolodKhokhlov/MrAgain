import "./CreateAccountCard.less";

import { Button } from "antd";
import Link from "next/link";
import React from "react";

const CreateAccountCard3 = (params) => {
  return (
    <div className="trial-month">
      <div className={"trial-month-title bgcolor-" + params.color}>
        <div>TRIAL ABBONNEMENT</div>
      </div>
      <div className="trial-month-content">
        <div className="trial-month-content-title">
          <span>Starting at</span>
          <span>
            <span className="price-value">€{params.price}</span> / maand
          </span>
        </div>
        <div className="trial-month-content-body">
          <p>Lorem Ipsum is simply</p>
          <p>dummy text of the</p>
          <p>printing and typesetting</p>
          <p>industry. Lorem Ipsum</p>
          <p>has been the</p>
          <p>Industry's standard</p>
          <p>dummy text ever since the</p>
          <Link prefetch={false} href="/maak-een-account-aan">
            <Button className={"price-page-btn bgcolor-" + params.color}>
              CREATE ACCOUNT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountCard3;
