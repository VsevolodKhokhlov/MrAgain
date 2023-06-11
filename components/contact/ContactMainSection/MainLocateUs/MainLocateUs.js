import "./MainLocateUs.style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
  LocateEmail,
  LocateInfo,
  LocatePhone,
  LocatePostion,
  LocateTitle,
  MainLocateUsBlog,
  MainLocateUsContent,
  SocialLink,
} from "./MainLocateUs.style";

const MainLocateUs = () => (
  <MainLocateUsBlog>
    <MainLocateUsContent>
      <LocateTitle>Gegevens</LocateTitle>
      <LocateInfo className="locate-info">
        <LocatePostion className="locate-position">
          <a href="#14/1dummy address" to="/page">
            <FontAwesomeIcon
              className="margin-10 position-icon"
              icon={["fas", "map-marker-alt"]}
            />
            <label className="locate-label">Utrecht, Nederland</label>
          </a>
        </LocatePostion>
        <LocatePhone>
          <a href="#+41 55604480" to="/page">
            <FontAwesomeIcon
              className="margin-10"
              icon={["fas", "phone-volume"]}
            />
            <label className="locate-label">+31 643972900</label>
          </a>
        </LocatePhone>
        <LocateEmail>
          <a href="#info@repairshop.com" to="/page">
            <FontAwesomeIcon className="margin-10" icon={["fas", "envelope"]} />
            <label className="locate-label">info@mragain.nl</label>
          </a>
        </LocateEmail>
        <SocialLink className="social-link">
          <a href="#Facebook">
            <div className="icon-circle">
              <FontAwesomeIcon
                className="social-icon facebook-icon"
                icon={["fab", "facebook-f"]}
              />
            </div>
          </a>
          <a href="Twitter">
            <div className="icon-circle">
              <FontAwesomeIcon
                className="social-icon twitter-icon"
                icon={["fab", "twitter"]}
              />
            </div>
          </a>
          <a href="Youtube">
            <div className="icon-circle">
              <FontAwesomeIcon
                className="social-icon youtube-icon"
                icon={["fab", "youtube"]}
              />
            </div>
          </a>
          <a href="Instagram">
            <div className="icon-circle">
              <FontAwesomeIcon
                className="social-icon instagram-icon"
                icon={["fab", "instagram"]}
              />
            </div>
          </a>
        </SocialLink>
      </LocateInfo>
    </MainLocateUsContent>
  </MainLocateUsBlog>
);

export default MainLocateUs;
