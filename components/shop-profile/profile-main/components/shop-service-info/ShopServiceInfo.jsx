import "bootstrap/dist/css/bootstrap.min.css";
import "./ShopServiceInfo.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import shopimage from "@/assets/images/shop-map.png";

const ShopServiceInfo = (routerProps) => {
  const [siteUrl, setSiteUrl] = useState("");
  const [openTime, setOpenTime] = useState({});
  const { isLoadedProfile, account_profile, account_valid_time } = routerProps;

  useEffect(() => {
    if (isLoadedProfile === true) {
      if (Object.keys(account_profile).length > 0) {
        // if (account_profile.site_url.length > 0) {
        //   let temp = JSON.parse(account_profile.site_url);
        //   let url1 = temp.site_url !== undefined ? temp.site_url : "";
        //   let url2 = temp.social_link !== undefined ? temp.social_link : "";
        //   let str = `${url1} ${url2}`;
        //   setSiteUrl(str);
        // }
        setSiteUrl(account_profile.site_url);
      }
      if (Object.keys(account_valid_time).length > 0) {
        let temp = JSON.parse(account_valid_time);
        setOpenTime(temp);
      }
    }
  }, [isLoadedProfile, account_profile, account_valid_time]);
  return (
    <div className="shop-service-info">
      <div className="shop-service-info-wrap">
        <div className="shop-contact-info">
          <div className="shop-contact-item">
            <FontAwesomeIcon
              className="margin-10"
              icon={["fas", "phone-alt"]}
            />
            <a href="#+41 55604480" to="/page">
              <label className="contact-info-label">
                {account_profile.phone_number}
              </label>
            </a>
          </div>
          <div className="shop-contact-item">
            <FontAwesomeIcon
              className="margin-10 position-icon"
              icon={["fas", "globe-americas"]}
            />
            <a href="#www.phonemaker.nl" to="/page">
              <label className="contact-info-label">{siteUrl}</label>
            </a>
          </div>
          <div className="shop-contact-item">
            <FontAwesomeIcon
              className="margin-10 position-icon"
              icon={["fas", "map-marker-alt"]}
            />
            <a href="#14/1dummy address" to="/page">
              <label className="contact-info-label">
                {account_profile.street !== undefined &&
                  `${account_profile.street} `}
                {account_profile.street !== undefined &&
                  `${account_profile.city}`}
              </label>
            </a>
          </div>
        </div>
        <div className="shop-opentime-table">
          <div className="shop-opentime-table-wrap">
            <Table striped>
              <tbody>
                <tr>
                  <td>Maandag</td>
                  <td>{openTime.Mon}</td>
                </tr>
                <tr>
                  <td>Dinsdag</td>
                  <td>{openTime.Tue}</td>
                </tr>
                <tr>
                  <td>Woensdag</td>
                  <td>{openTime.Wed}</td>
                </tr>
                <tr>
                  <td>Donderdag</td>
                  <td>{openTime.Thu}</td>
                </tr>
                <tr>
                  <td>Vrijdag</td>
                  <td>{openTime.Fri}</td>
                </tr>
                <tr>
                  <td>Zaterdag</td>
                  <td>{openTime.Sat}</td>
                </tr>
                <tr>
                  <td>Zondag</td>
                  <td>{openTime.Sun}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        {/* <div className="shop-location-map">
          <img src={shopimage} alt="Logo" />
        </div>*/}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  account_valid_time: state.account.account_valid_time,
  account_profile: state.account.shop_account_profile,
  isLoadedProfile: state.account.isLoadedProfile,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopServiceInfo);
