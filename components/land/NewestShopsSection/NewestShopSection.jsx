import "bootstrap/dist/css/bootstrap.min.css";
import "../component.style.less";
import "./NewestShopSection.style.less";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getNewestShopList } from "service/search/operations.js";

// import { getAccountProfile } from "service/account/operations.js";
import { BACK_END_URL } from "../../../constants.js";
import {
  AdvantageSectionTitle,
  DotDevider,
  SectionModel,
} from "../component.style.jsx";
import { NewestShopSectionArea } from "./NewestShopSection.style";
import ShopInfoCard from "./ShopInfoCard/ShopInfoCard";

const image3 = BACK_END_URL + "/static/media/home_newest_image3.8798cc16.jpg";

const NewestShopSection = (routerProps) => {
  const router = useRouter();
  const { newestShopList, getNewestShopList } = routerProps;

  const [shopCount] = useState(5);
  const [isload, setLoad] = useState(false);

  useEffect(() => {
    if (isload === false) {
      getNewestShopList(shopCount, null);
      setLoad(true);
    }
  }, [isload]);

  const onProfilePage = (shop_name, city, street) => {
    const shop = shop_name.replaceAll(" ", "-");
    const cityName = city.replaceAll(" ", "-");

    if (cityName === "") {
      router.push(`/${shop}`);
    } else {
      router.push(`/${shop}--${cityName}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <NewestShopSectionArea>
      <Container className="newestshop-section-container" fluid={true}>
        <Row>
          <AdvantageSectionTitle color={"#1c2430"}>
            Deze telefoon reparateurs gingen je voor
          </AdvantageSectionTitle>
        </Row>
        <Row>
          <SectionModel>
            <DotDevider color={"fff"} />
          </SectionModel>
        </Row>
        <Row className="newshop-card-blog">
          {newestShopList !== undefined &&
            newestShopList.map((el) => {
              const string = { BACK_END_URL };
              return (
                <ShopInfoCard
                  title={el.name}
                  phone={el.phone_number}
                  position={(el.street, el.city)}
                  open={"NIEUW"}
                  image={
                    el.logo_photo !== ""
                      ? el.logo_photo
                      : el.logo_photo === "" && el.bg_photo !== ""
                      ? el.bg_photo
                      : image3
                  }
                  alt="reparateur-profielfoto"
                  key={el.id}
                  onprofilepage={() =>
                    onProfilePage(el.name, el.city, el.street)
                  }
                />
              );
            })}
        </Row>
        <Row className="load-more-btn justify-center">
          <Button
            variant="success"
            onClick={() => {
              scrollToTop();
            }}
          >
            {" "}
            Meld je nu aan{" "}
          </Button>
        </Row>
      </Container>
    </NewestShopSectionArea>
  );
};

const mapStateToProps = (state) => ({
  newestShopList: state.search.newestShopList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getNewestShopList: (count, city) => {
      getNewestShopList(count, city, dispatch);
    },
    // getAccountProfile: (id) => {
    //   getAccountProfile(id, dispatch);
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewestShopSection);
