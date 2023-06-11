import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";

import { useScreenSize } from "@/utils/media";

import Loader from "../Loader";

const Slider = dynamic(() => import("react-slick"), {
  loading: Loader,
  ssr: false,
});

const defaultSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: (
    <button>
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  ),
  nextArrow: (
    <button>
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  ),
};

const Slide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderWrap = styled.div`
  .slick-next,
  .slick-prev {
    left: 0;
    background-color: transparent;
    color: #555;
    margin-top: -15px;
    z-index: 100;

    ::before {
      display: none;
    }
    .svg-inline--fa {
      width: 20px;
      height: 20px;
    }
  }

  .slick-next {
    top: 50%;
    right: 0;
    left: auto;
  }
`;

export default function SliderOnMobile({ children, tabletConfig, ...rest }) {
  const { size } = useScreenSize();
  let settings = { ...defaultSettings, ...rest };

  if (size === "tablet" && tabletConfig) {
    settings = {
      ...defaultSettings,
      ...tabletConfig,
    };
  }

  if (size !== "mobile" && !(size === "tablet" && tabletConfig)) {
    return children;
  }

  return (
    <SliderWrap>
      <Slider {...settings}>
        {React.Children.map(children, (child) => (
          <div>
            <Slide>{child}</Slide>
          </div>
        ))}
      </Slider>
    </SliderWrap>
  );
}
