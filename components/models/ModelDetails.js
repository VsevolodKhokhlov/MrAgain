import "./modelDetails.css";
import "../../components/global/StarRatingInfo/StarRatingInfo.less";

import { Rate } from "antd";
import classnames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Slider from "react-slick";

import { FRONT_END_URL } from "@/constants.js";

import batteryIssue from "../../assets/icons/Problems - Battery.svg";
import connectivityIssue from "../../assets/icons/Problems - Connectivity.svg";
import crackIssue from "../../assets/icons/Problems - Crack.svg";
import locationIssue from "../../assets/icons/Problems - Location.svg";
import signalIssue from "../../assets/icons/Problems - Signal.svg";
import releasedDate from "../../assets/icons/Specifications - Date.svg";
import noPreview from "../../assets/images/no-preview-available.png";

export default function ModelDetails(routerProps) {
  const { modelDetails, reparations } = routerProps;
  const router = useRouter();

  const updateDimensions = () => {
    setState({
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    setState({
      width: window.innerWidth,
    });
  }, []);

  const [state, setState] = useState({
    width: 0,
  });

  const [modelImages, setmodelImages] = useState(reparations);
  const [currentImage, setcurrentImage] = useState("");
  const model = modelDetails[0];

  const [availableDatas, setavailableDatas] = useState([]);
  useEffect(() => {
    const images = model.model_photo;
    if (images === null) {
      setcurrentImage(null);
      setmodelImages([noPreview]);
    } else {
      const removeSingleQuote = images.replace(/'/g, '"');
      const convertToArray = JSON.parse(removeSingleQuote);
      setcurrentImage(convertToArray[0]);
      setmodelImages(convertToArray);
    }
  }, [modelDetails]);

  const [issueData, setissueData] = useState([
    {
      image: crackIssue,
      title: "Damaged Screen",
    },
    {
      image: batteryIssue,
      title: "Battery Drain Issues",
    },
    {
      image: signalIssue,
      title: "Weak Signal Reception",
    },
    {
      image: locationIssue,
      title: "Inaccurate GPS Location",
    },
    {
      image: connectivityIssue,
      title: "Connectivity Issues",
    },
  ]);

  let vertical = true;
  let verticalSwiping = true;
  if (state.width < 576) {
    vertical = false;
    verticalSwiping = false;
  }
  let settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    vertical,
    verticalSwiping,
    verticalArrows: true,
    swipeToSlide: true,
    currentSlide: 0,
    arrows: false,
  };

  const onselectImage = (image) => {
    setcurrentImage(image);
  };

  let title = `${model.model_name} reparatie | MrAgain`;
  let description = `Alles over de meest voorkomende ${model.model_name} problemen en reparaties vind je hier`;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="Keywords" content="Model Details, Mr-Again" />
        <meta name="description" content={description} />
        <script
          src="https://kit.fontawesome.com/6cdc6e8865.js"
          crossOrigin="anonymous"
        ></script>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu"
          crossOrigin="anonymous"
        ></link>
        <link rel="canonical" href={FRONT_END_URL + router.asPath} />
        <meta property="og:type" content="website" />
        <meta name="og_title" property="og:title" content={description} />
        <meta
          property="og:description"
          content="Vind de beste reparateur bij jou in de buurt"
        />
        <meta name="og:url" content={FRONT_END_URL + router.asPath} />
        <meta property="og:image" content="" />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />
      </Head>
      <div className="row ">
        <div className="col-md-12 col-xs-12  pt-3 ">
          <div className="row pl-4 pr-0 mt-sm-5 mt-md-2">
            <div
              //  className=" col-lg-1 col-md-2 col-xs-order-12 col-sm-2  float-right"
              className={classnames(
                " col-lg-1 col-md-2 col-sm-2  float-right",
                { "order-12": state.width < 576 }
              )}
            >
              <Slider {...settings}>
                {modelImages !== undefined &&
                  modelImages.map((image, i) => (
                    <img
                      src={image}
                      className="w-100 slider-image"
                      onClick={() => onselectImage(image)}
                      key={i}
                    />
                  ))}
              </Slider>
            </div>
            <div
              // className="col-lg-6 col-md-5 col-xs-order-1 col-sm-10 mt-3 image-preview "
              className={classnames(
                "col-lg-6 col-md-5 col-sm-10 mt-1 image-preview",
                { "order-1": state.width < 576 }
              )}
            >
              {currentImage === null ? (
                <img src={noPreview} alt="" className="w-100 align-bottom" />
              ) : (
                <SideBySideMagnifier
                  imageSrc={currentImage}
                  imageAlt="Example"
                  fillAvailableSpace={false}
                  alwaysInPlace={true}
                  fillGapLeft={10}
                  fillGapRight={20}
                  fillGapTop={120}
                  fillGapBottom={80}
                />
              )}
            </div>
            <div className="col-md-5  col-sm-12 pl-sm-5 pl-lg-5 ">
              <div className="model-details">
                <p className="brand py-0 my-1 ">
                  {model.brand.brand_name.toUpperCase()}
                </p>
                <h3 className="pb-0 mb-1">{model.model_name}</h3>
                <div className="star-rate-info ">
                  <span className="series-number pt-5">
                    {model.model_serie_number}
                  </span>
                  <Rate value={parseInt(4)} className="star-rate" />
                </div>
                <p className="mt-4 mb-4">
                  <img
                    src={releasedDate}
                    style={{ width: "20px", marginRight: "5px" }}
                  />
                  Released{" "}
                  {model.model_year === null
                    ? " date not available"
                    : model.model_year}
                </p>
              </div>
              <hr />
              <div className="text-justify">
                {model.model_info !== null
                  ? model.model_info
                  : "No details available for this model"}
              </div>
              <button className="btn book-repair">
                Zoek een reparateur{" "}
                <i className="fas fa-arrow-right book-repair-icon"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="w-100  mb-5 mx-md-5 mx-sm-3 mx-xs-3">
          <div className="list-title">
            De 5 meest voorkomende {model.model_name} problemen
          </div>
          <div className="top-5-content px-0  mx-0">
            <div className="row mx-2 mx-sm-2 px-sm-2  mx-xs-1 px-xs-1 px-5">
              {issueData.length > 0
                ? issueData.map((issue, i) => (
                    <div className="list-details  d-inline" key={i}>
                      <img
                        src={issue.image}
                        alt=""
                        className="list-image pt-1 "
                      />
                      <span className="">{issue.title}</span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <section className="all-services pb-5">
          <div className="row">
            <div className="col-md-1 "></div>
            <div className="col-md-10  ">
              <div className="services-title">
                <h4>Alle {model.model_name} reparaties</h4>
                {/* <input type="text" className="" placeholder="SEARCH" /> */}
              </div>
              {reparations !== undefined && reparations.length > 0 ? (
                reparations.map((reparation, i) => (
                  <Fragment key={i}>
                    {reparation.price.length > 0 && (
                      <div className="services-list" key={i}>
                        <div className="row">
                          <div className="col-md-8 col-sm-6 d-inline">
                            <div className="service-icons">
                              {reparation.repair_image !== "" ? (
                                <img
                                  src={reparation.repair_image}
                                  className="icon-img"
                                />
                              ) : (
                                <div className="service-icons">
                                  <i className="far fa-images icon-img"></i>
                                </div>
                              )}
                            </div>
                            <span className="ml-3">
                              {reparation.reparation_name}
                            </span>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="service-section-2 ">
                              <div className="start-at-label">Prijs range</div>
                              {reparation.price.length > 0 ? (
                                <div className=" price-label ">
                                  €{Math.min(...reparation.price)} - €
                                  {Math.max(...reparation.price)}
                                </div>
                              ) : (
                                <div className="price-label ">€0 - €0</div>
                              )}
                            </div>
                            <button className="btn browse-shops ">
                              Toon reparateurs
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))
              ) : (
                <div className="services-list">No records found</div>
              )}
            </div>
            <div className="col-md-1"></div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
