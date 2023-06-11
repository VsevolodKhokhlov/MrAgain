import "bootstrap/dist/css/bootstrap.min.css";
import "./ShopInfoCard.style.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import StarRatingInfo from "../StarRatingInfo/StarRatingInfo";
import { CardInfo } from "./ShopInfoCard.style.jsx";
const ShopInfoCard = (routerProps) => {
  const {} = routerProps;
  const router = useRouter();
  const onProfilePage = (shop_name, city, street) => {
    let shop = shop_name;
    let cityName = city;

    let routerData = `/${shop}--${cityName}`;

    shop = shop.replaceAll(" ", "-");

    if (cityName === undefined) {
      routerData = `/${shop}`;
    } else {
      cityName = cityName.replaceAll(" ", "-");
      routerData = `/${shop}--${cityName}`;
    }

    // router.push(`/profiel/${shop}--${cityName}--${streetName}`);
    // router.push(routerData);
    return routerData;
  };

  function onMakeAppointment(shop_id) {
    let flg = 0;
    router.push(`/maak-een-afspraak?shop=${shop_id}&initdate=${flg}`);
  }

  function displayMakeAppointment(isType, rate, distance, pos) {
    if (isType === 1) {
      return (
        <CardInfo className="card-info">
          <StarRatingInfo rate={rate} />
          <a href="/page">
            <FontAwesomeIcon
              className="margin-10 position-icon"
              icon={["fas", "map-marker-alt"]}
            />
            <label className="card-label">{distance}</label>
          </a>
          {pos !== -1 && (
            <a href="/page">
              <FontAwesomeIcon className="margin-10" icon={["fas", "clock"]} />
              <label>{pos}</label>
            </a>
          )}
          <Button
            className="create-appointment-btn"
            onClick={() => onMakeAppointment(routerProps.shop_id)}
          >
            Maak een afspraak
          </Button>
        </CardInfo>
      );
    }
    return null;
  }

  return (
    <Card>
      <Link
        href={onProfilePage(
          routerProps.shop_name,
          routerProps.city,
          routerProps.street
        )}
        passHref={true}
        prefetch={false}
      >
        <a>
          <Image
            width={240}
            height={162}
            className={"card-img-top"}
            variant="top"
            src={routerProps.image}
            alt="Reparateur-profielfoto"
            // onClick={() =>
            //   onProfilePage(
            //     routerProps.shop_name,
            //     routerProps.city,
            //     routerProps.street
            //   )
            // }
          />
        </a>
      </Link>
      <Card.Body>
        <Card.Title>
          {routerProps.title}
          <div className="shop-service-price">{routerProps.price}</div>
        </Card.Title>
        {displayMakeAppointment(
          routerProps.type,
          routerProps.rate,
          routerProps.distance,
          routerProps.guar_time
        )}
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // getAccountProfile: (id) => {
    //   getAccountProfile(id, dispatch);
    // },
    // getReparationGuarantee: (id) => {
    //   getReparationGuarantee(id, dispatch);
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopInfoCard);
