import "./ProfileMainSection.less";

import React from "react";

import {
  AppointmentDirectly,
  DeviceTypeSelect,
  ReviewCheckOut,
  ServiceTable,
  ShopServiceInfo,
} from "./components";

const ProfileMainSection = () => {
  return (
    <div className="profile-main-container">
      <div className="wrap">
        <div className="row">
          <div className="review-select-blog col-lg-3 col-lg-3 col-md-12">
            <ReviewCheckOut />
            <DeviceTypeSelect />
          </div>
          <div className="appointment-service-blog col-lg-6 col-lg-6 col-md-12">
            <AppointmentDirectly />
            <ServiceTable />
          </div>
          <div className="opening-time-blog col-lg-3 col-lg-3 col-md-12">
            <ShopServiceInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMainSection;
