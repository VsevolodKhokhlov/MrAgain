import "./modelDetails.css";
import "../../components/global/StarRatingInfo/StarRatingInfo.less";

import { Rate } from "antd";
import { Layout } from "components/global";
import Head from "next/head";
import React from "react";
import { useState } from "react";
// import ReactImageMagnify from "react-image-magnify";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Slider from "react-slick";

import { Main } from "@/styled-components/reparatie-en-service.style.jsx";

import batteryIssue from "../../assets/icons/Problems - Battery.svg";
import connectivityIssue from "../../assets/icons/Problems - Connectivity.svg";
import crackIssue from "../../assets/icons/Problems - Crack.svg";
import locationIssue from "../../assets/icons/Problems - Location.svg";
import signalIssue from "../../assets/icons/Problems - Signal.svg";
import releasedDate from "../../assets/icons/Specifications - Date.svg";
export default function Index() {
  const [modelImages] = useState([
    "https://cdn-0.idownloadblog.com/wp-content/uploads/2019/09/iPhone-11-Pro-Max-Midnight-Green-Mockup-with-AR72014-iDownloadBlog-scaled.jpeg",
    "https://www.iphonehacks.com/wp-content/uploads/2019/10/iphone-11-pro-max-teardown.jpg",
    "https://misterminit.co/wp-content/uploads/2016/10/iphone-screen-repair-sydney.jpg",
    "https://i.pinimg.com/originals/8b/e4/c6/8be4c66bd3d94434e888de089226ad7f.jpg",
    "https://o.aolcdn.com/images/dims?quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FD8mu7GAVkdYxbaGbmbHyJA--%7EB%2FaD05NzI7dz0xNjAwO2FwcGlkPXl0YWNoeW9u%2Fhttps%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Ff9cd12e8a31e295524b7ef4755ed488b%2F205342770%2FRTX27FN4-ed.jpg&client=amp-blogside-v2&signature=d4f55c01c8007e4f3d7dd48e8a7c1d7ff43a6fa3",
    "https://www.restorecomputerrepair.com/images/services_images/iphone_repair_baltimore.jpg",
  ]);

  const [currentImage, setcurrentImage] = useState(modelImages[0]);

  const [issueData] = useState([
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

  const [allServices] = useState([
    { icon: "fas fa-bolt", serviceName: "Scherm vervangen", price: "49.33" },
    {
      icon: "fas fa-battery-quarter",
      serviceName: "Batterij vervangen",
      price: "25.50",
    },
    { icon: "fas fa-tint", serviceName: "Waterschade", price: "34.40" },
    { icon: "fas fa-camera", serviceName: "Front Camera", price: "29.37" },
    {
      icon: "fas fa-charging-station",
      serviceName: "Oplaadpunt",
      price: "49.33",
    },
    { icon: "fas fa-camera", serviceName: "Back camera", price: "45.33" },
    {
      icon: "fas fa-headphones-alt",
      serviceName: "Earspeaker",
      price: "39.31",
    },
    { icon: "fas fa-volume-up", serviceName: "Loudspeaker", price: "42.19" },
    { icon: "fas fa-home", serviceName: "Behuizing", price: "34.33" },
    { icon: "fab fa-usb", serviceName: "USB connector", price: "32.33" },
    { icon: "fas fa-mobile", serviceName: "Back cover", price: "38.74" },
    { icon: "fas fa-diagnoses", serviceName: "Diagnose", price: "44.30" },
    { icon: "fas fa-toggle-on", serviceName: "Aan-uit-knop", price: "36.13" },
    {
      icon: "fas fa-exchange-alt",
      serviceName: "Data overzetten",
      price: "25.58",
    },
    {
      icon: "fas fa-trash-restore-alt",
      serviceName: "Software reset",
      price: "29.76",
    },
    { icon: "fas fa-wrench", serviceName: "Software Update", price: "32.68" },
  ]);

  let settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    vertical: true,
    verticalSwiping: true,
    verticalArrows: true,
    swipeToSlide: true,
    currentSlide: 0,
    arrows: false,
  };

  const onselectImage = (image) => {
    // console.log("🚀 => onselectImage => image", image);
    setcurrentImage(image);
  };

  return (
    <Layout>
      <Main>
        <Head>
          <title>MrAgain-Model Details</title>
          <meta name="Keywords" content="Blogs, Mr-Again" />
          <meta name="description" content="MrAgain ModelDetails" />
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
          {/* <link rel="canonical" href={FRONT_END_URL + "/blog"} /> */}
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content="Onze blogs" />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          {/* <meta name="og:url" content={FRONT_END_URL + "/blog"} /> */}
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
        </Head>
        <div className="row ">
          <div className="col-md-12 col-xs-12  pt-3 ">
            <div className="row px-5 mt-sm-5 mt-md-2">
              <div className=" col-lg-1 col-md-2 col-xs-3 col-sm-3 ">
                <Slider {...settings}>
                  {modelImages.map((im) => (
                    <img
                      src={im}
                      className="w-100 slider-image"
                      onClick={() => onselectImage(im)}
                    />
                  ))}
                </Slider>
              </div>
              <div className="col-lg-6 col-md-5 col-xs-5 col-sm-9 image-preview ">
                <SideBySideMagnifier
                  imageSrc={currentImage}
                  imageAlt="Example"
                  fillAvailableSpace="false"
                  alwaysInPlace="true"
                  fillGapLeft={10}
                  fillGapRight={20}
                  fillGapTop={120}
                  fillGapBottom={80}
                />
              </div>
              <div className="col-md-5  col-xs-4 pl-2 pl-lg-5 ">
                <div className="model-details">
                  <p className="brand py-0 my-1 ">SAMSUNG</p>
                  <h3 className="pb-0 mb-0">iphone 11 Pro</h3>
                  <div className="star-rate-info py-0 y-0">
                    <Rate value={parseInt(4)} className="star-rate" />
                  </div>
                  <p className="mt-3">
                    <img
                      src={releasedDate}
                      style={{ width: "20px", marginRight: "5px" }}
                    />
                    Released 2020, August 21
                  </p>
                </div>
                <hr />
                <div className="text-justify">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </div>
                <button className="btn book-repair">
                  BOOK FOR A REPAIR{" "}
                  <i className="fas fa-arrow-right book-repair-icon"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="w-100  mb-5 mx-md-5 mx-sm-3 mx-xs-3">
            <div className="list-title">TOP 5 COMMON ISSUES </div>
            <div className="top-5-content px-0  mx-0">
              <div className="row mx-2 mx-sm-2 px-sm-2  mx-xs-1 px-xs-1 px-5">
                {issueData.length > 0
                  ? issueData.map((issue, i) => (
                      <div className="list-details  d-inline">
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
          <section className="all-services">
            <div className="row">
              <div className="col-md-1 "></div>
              <div className="col-md-10  ">
                <div className="services-title">
                  <h4>ALL AVAILABLE SERVICES OFFERED</h4>
                  <input type="text" className="" placeholder="SEARCH" />
                </div>
                {allServices.map((service, i) => (
                  <div className="services-list" key={i}>
                    <div className="row">
                      <div className="col-md-8 d-inline">
                        <span className="service-icons">
                          <i className={`${service.icon}`} />
                        </span>
                        <span className="ml-3">{service.serviceName}</span>
                      </div>
                      <div className="col-md-4  ">
                        <div className="float-left text-center mr-4">
                          <div className="start-at-label">Starts At</div>
                          <div className=" price-label ">${service.price}</div>
                        </div>
                        <button className="btn browse-shops ">
                          Browse Shops
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-1"></div>
            </div>
          </section>
        </div>
      </Main>
    </Layout>
  );
}
