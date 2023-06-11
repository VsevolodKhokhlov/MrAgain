import "./ProfileBannerSection.less";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setLoadedProfile } from "service/account/action.js";

import StarRatingInfo from "@/components/global/StarRatingInfo/StarRatingInfo";

import { ProfileBannerContainer } from "./ProfileBannerSection.style";

const ProfileBannerSection = (routerProps) => {
  const {
    shopReviews,
    account_profile,
    isLoadedProfile,
    setLoadedProfile,
    filterlistPBM,
  } = routerProps;

  useEffect(() => {
    if (isLoadedProfile === true) {
      if (Object.keys(shopReviews).length !== 0) {
      }
      setLoadedProfile(false);
    }
  });

  return (
    <ProfileBannerContainer
      className="profile-banner-section"
      bgImage={
        account_profile.bg_photo !== undefined && account_profile.bg_photo
      }
    >
      <div className="wrap">
        <div className="banner-blog">
          <div className="banner-title">
            <h4>{account_profile.name}</h4>
          </div>
          <div className="banner-rating">
            <StarRatingInfo rate={account_profile.mark} />
          </div>
          <div className="banner-content">
            <div className="banner-content-title">
              {filterlistPBM.map((element) => {
                return `${element.device_name} `;
              })}
            </div>
            <div className="banner-content-text">
              {account_profile.about_us}
            </div>
          </div>
        </div>
      </div>
    </ProfileBannerContainer>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  shopReviews: state.account.account_review,
  isLoadedProfile: state.account.isLoadedProfile,
  // account_profile: state.account.account_profile,
  account_profile: state.account.shop_account_profile,
  filterlistPBM: state.search.fieldlistPBM,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    setLoadedProfile: (data) => {
      dispatch(setLoadedProfile(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileBannerSection);
