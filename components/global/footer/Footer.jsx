import "./Footer.less";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withUserAgent } from "next-useragent";
import React from "react";

import { CookieBanner } from "@/components/cookie-banner/CookieBanner";

import {
  DevicesContainer,
  FollowUs,
  FollowUsTitle,
  FooterBrandArea,
  FooterBrandLogo,
  FooterBrandTitle,
  FooterCopyright,
  FooterLinkArea,
  FooterLogoIcon,
  FooterSitemap,
  FooterSitemapTitle,
  FooterViewContainer,
  FooterViewContent,
  FooterViewSection,
  LogoBottomTitle,
  LogoTopTitle,
} from "./Footer.style";

const FooterView = (routerProps) => {
  const { location, ua, getDevices, shopDevices } = routerProps;

  const router = useRouter();
  const splitUrl = "/" + router.pathname.split("/")[1];
  const visible =
    splitUrl === "/" ||
    splitUrl === "/zoek-resultaten" ||
    splitUrl === "/profiel" ||
    splitUrl === "/maak-een-afspraak" ||
    splitUrl === "/bevestig-je-afspraak" ||
    splitUrl === "/over-ons" ||
    splitUrl === "/hoe-werkt-het" ||
    splitUrl === "/contact-met-mragain" ||
    splitUrl === "/prijs" ||
    splitUrl === "/reparatie" ||
    splitUrl === "/maak-een-account-aan" ||
    splitUrl === "/login" ||
    splitUrl === "/meld-je-aan-als-reparateur" ||
    splitUrl === "/veel-gestelde-vragen" ||
    splitUrl === "/checkout-review" ||
    splitUrl === "/reset-je-wachtwoord" ||
    splitUrl === "/bevestig-je-wachtwoord-reset";
  splitUrl === "/over-reparaties";
  splitUrl === "/blog" ? "flex" : "none";

  let notBot =
    ua &&
    ua.source &&
    !ua.isBot &&
    ua.source.toLowerCase().indexOf("google") < 0 &&
    ua.source.toLowerCase().indexOf("pagespeed") < 0 &&
    ua.source.toLowerCase().indexOf("lighthouse") < 0;
  return (
    <FooterViewSection>
      <FooterViewContainer show={visible}>
        <FooterViewContent>
          <FooterBrandArea ClassName="custm-footer-brandarea">
            <FooterBrandLogo>
              <FooterLogoIcon>
                <Image
                  quality={100}
                  loading={"eager"}
                  priority={true}
                  width={104}
                  height={40}
                  src="/images/mragain.svg"
                  alt="Logo Mr Again"
                />
              </FooterLogoIcon>
              <FooterBrandTitle>
                <LogoTopTitle></LogoTopTitle>
                <LogoBottomTitle></LogoBottomTitle>
              </FooterBrandTitle>
            </FooterBrandLogo>
            <p className="footer-brand-content">
              De beste reparateurs voor jouw device, die vind je bij MrAgain.
              Wij geloven dat de wereld net een beetje mooier wordt als we er
              voor kunnen zorgen dat de levensduur van jouw device verlengd
              wordt. Van waterschade, vervangen van je scherm of ingewikkelde
              moederbord reparaties, er is altijd een telefoon reparateur die je
              kan helpen met jouw telefoon reparatie.
              <br />
              {/* <a href="#more">More..</a> */}
            </p>
          </FooterBrandArea>
          <FooterLinkArea className="footer-link-area">
            <FooterSitemap ClassName="custome-footer-sitename">
              <FooterSitemapTitle>Over MrAgain</FooterSitemapTitle>
              <ul>
                <li>
                  <Link prefetch={false} href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/over-ons">
                    Over ons
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/reparatie">
                    De voordelen
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/meld-je-aan-als-reparateur">
                    Meld je aan als reparateur
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/contact-met-mragain">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/veel-gestelde-vragen">
                    Veel gestelde vragen
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/blog">
                    Blogs
                  </Link>
                </li>
                {/*<li>
                  <Link prefetch={false} href="/reparatie">
                    Reparaties
                  </Link>
                </li>*/}
              </ul>
            </FooterSitemap>
            <FollowUs className="follow-us">
              <FollowUsTitle>Volg ons op</FollowUsTitle>
              <ul>
                <li className="facebook">
                  <a
                    href="https://www.facebook.com/Mr-Again-105437267708409/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <div className="icon-circle">
                      <i className="anticon">
                        <svg
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                          focusable="false"
                          className=""
                        >
                          <use xlinkHref="#icon-facebook">
                            <svg id="icon-facebook" viewBox="0 0 1024 1024">
                              <path d="M535.9 1023.9c68.2 0 132.6 0 159.6 0l0 0.1C668.4 1024 604.1 1024 535.9 1023.9L535.9 1023.9zM253.5 0.6c-23 0.4-46.2 1.9-67 5.8-22.6 4.3-43.2 10-63.8 20.5-20.9 10.6-38.9 25.1-55 40.8-15.7 16.1-30.2 34.2-40.8 55-10.4 20.6-16.2 41.1-20.5 63.8-3.9 20.8-5.4 44-5.8 67-0.1 5.2-0.1 10-0.2 17.5l-0.3 450c0 5.7 0.1 11.9 0.1 18.7 0.2 16.3 0.3 23 0.4 30.7 0.4 23 1.9 46.2 5.8 67 1.9 9.9 4 19.4 6.7 28.6 3.5 11.9 7.9 23.5 13.8 35.1 10.6 20.9 25.1 38.9 40.8 55 16.1 15.7 34.2 30.2 55 40.8 20.6 10.4 41.1 16.2 63.8 20.5 20.8 3.9 44 5.4 67 5.8 7.7 0.1 14.4 0.2 30.7 0.4 15.5 0.1 28.2 0.2 37.6 0.2 26.1 0 123.5 0 214 0l0-397L407.1 626.8 407.1 478.3l127.8 0L534.9 340.1C534.9 234 616.9 158 722.9 158l137.2 3 0 142.6L755.3 303.6c-30.3 0-54.9 33.5-54.9 63.9l0 110.8 154.6 0-22 148.6L695.5 626.9l0 397c2.5 0 4.8 0 6.6 0 9.4 0 22.1-0.1 37.6-0.2 12.9-0.1 19.8-0.2 25.9-0.2 1.6 0 3.2 0 4.9-0.1 23-0.4 46.2-1.9 67-5.8 22.6-4.3 43.2-10 63.8-20.5 20.9-10.6 38.9-25.1 55-40.8 15.7-16.1 30.2-34.2 40.8-55 10.4-20.6 16.2-41.1 20.5-63.8 3.9-20.8 5.4-44 5.8-67 0.1-7.7 0.2-14.4 0.4-30.7 0.1-15.5 0.2-28.2 0.2-37.6L1024 321.9c0-3.2 0-6.9 0-10.9 0-7.6-0.1-16.6-0.2-26.8-0.2-16.3-0.3-23-0.4-30.7-0.4-23-1.9-46.2-5.8-67-4.3-22.6-10-43.2-20.5-63.8-10.6-20.9-25.1-38.9-40.8-55-16.1-15.7-34.2-30.2-55-40.8-20.6-10.4-41.1-16.2-63.8-20.5-20.8-3.9-44-5.4-67-5.8-7.7-0.1-14.4-0.2-30.7-0.4C724.2 0.1 711.5 0 702.1 0L321.8 0c-9.4 0-22.1 0.1-37.6 0.2C267.9 0.4 261.2 0.5 253.5 0.6z"></path>
                            </svg>
                          </use>
                        </svg>
                      </i>
                    </div>
                    <div>Facebook</div>
                  </a>
                </li>
                <li className="twitter">
                  <a
                    href="https://twitter.com/MrAgainofficial"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <div className="icon-circle">
                      <i className="anticon">
                        <svg
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                          focusable="false"
                          className=""
                        >
                          <use xlinkHref="#icon-twitter">
                            <svg id="icon-twitter" viewBox="0 0 1024 1024">
                              <path d="M1023.8 284.2c-0.2-16.3-0.3-23-0.4-30.7-0.4-23-1.9-46.2-5.8-67-4.3-22.6-10-43.2-20.5-63.8-10.6-20.9-25.1-38.9-40.8-55-16.1-15.7-34.2-30.2-55-40.8-20.6-10.4-41.1-16.2-63.8-20.5-20.8-3.9-44-5.4-67-5.8-7.7-0.1-14.4-0.2-30.7-0.4C724.2 0.1 711.5 0 702.1 0c-47.6 0-332.6 0-380.3 0-9.4 0-22.1 0.1-37.6 0.2-16.3 0.2-23 0.3-30.7 0.4-23 0.4-46.2 1.9-67 5.8-22.6 4.3-43.2 10-63.8 20.5-20.9 10.6-38.9 25.1-55 40.8-15.7 16.1-30.2 34.2-40.8 55-10.4 20.6-16.2 41.1-20.5 63.8-3.9 20.8-5.4 44-5.8 67-0.1 7.7-0.2 14.4-0.4 30.7C0.1 299.8 0 312.5 0 321.9l0 380.3c0 9.4 0.1 22.1 0.2 37.6 0.2 16.3 0.3 23 0.4 30.7 0.4 23 1.9 46.2 5.8 67 4.3 22.6 10 43.2 20.5 63.8 10.6 20.9 25.1 38.9 40.8 55 16.1 15.7 34.2 30.2 55 40.8 20.6 10.4 41.1 16.2 63.8 20.5 20.8 3.9 44 5.4 67 5.8 7.7 0.1 14.4 0.2 30.7 0.4 15.5 0.1 28.2 0.2 37.6 0.2 47.6 0 332.6 0 380.3 0 9.4 0 22.1-0.1 37.6-0.2 16.3-0.2 23-0.3 30.7-0.4 23-0.4 46.2-1.9 67-5.8 22.6-4.3 43.2-10 63.8-20.5 20.9-10.6 38.9-25.1 55-40.8 15.7-16.1 30.2-34.2 40.8-55 10.4-20.6 16.2-41.1 20.5-63.8 3.9-20.8 5.4-44 5.8-67 0.1-7.7 0.2-14.4 0.4-30.7 0.1-15.5 0.2-28.2 0.2-37.6L1023.9 321.9C1024 312.5 1023.9 299.8 1023.8 284.2zM807 363.3C803.6 620.6 639 796.9 393.4 808c-101.3 4.6-174.7-28.1-238.6-68.7 74.9 12 167.7-18 217.4-60.5-73.4-7.2-116.8-44.5-137.2-104.6 21.2 3.7 43.5 2.7 63.7-1.6-66.2-22.2-113.5-63.1-116-148.9 18.6 8.5 38 16.4 63.7 18-49.6-28.2-86.2-131.2-44.2-199.4 73.6 80.7 162.1 146.5 307.4 155.4C473.1 241.8 679.8 157.2 766.2 262c36.6-7.1 66.3-20.9 94.9-36-11.8 36.2-34.5 61.5-62.1 81.8 30.4-4.1 57.2-11.5 80.2-22.9C865 314.4 833.8 341 807 363.3z" />
                            </svg>
                          </use>
                        </svg>
                      </i>
                    </div>
                    <div>Twitter</div>
                  </a>
                </li>
                <li className="linkedin">
                  <a
                    href="https://www.linkedin.com/company/mragain/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <div className="icon-circle">
                      {/*<Icon type="linkedin" theme="filled" />*/}
                      <i
                        aria-label="icon: linkedin"
                        className="anticon anticon-linkedin"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          className=""
                          data-icon="linkedin"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z" />
                        </svg>
                      </i>
                    </div>
                    <div>LinkedIn</div>
                  </a>
                </li>
                <li className="instagram">
                  <a
                    href="https://www.instagram.com/mragainofficial/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <div className="icon-circle">
                      {/*<Icon type="instagram" theme="filled" />*/}
                      <i
                        aria-label="icon: instagram"
                        className="anticon anticon-instagram"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          className=""
                          data-icon="instagram"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"></path>
                        </svg>
                      </i>
                    </div>
                    <div>Instagram</div>
                  </a>
                </li>
              </ul>
            </FollowUs>
          </FooterLinkArea>
        </FooterViewContent>
      </FooterViewContainer>
      <DevicesContainer show={visible}>
        <FooterViewContent>
          <FooterLinkArea className="footer-link-area">
            <FooterSitemap ClassName="custome-footer-sitename">
              <FooterSitemapTitle>Zoek je device</FooterSitemapTitle>
              <ul>
                <li>
                  <Link prefetch={false} href="/devices/smartphone">
                    Smartphones
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/devices/tablet">
                    Tablets
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/devices/laptop">
                    Laptops
                  </Link>
                </li>
                {/*<li>
                  <Link prefetch={false} href="/tv-reparatie">
                    Televisies
                  </Link>
                </li>
	        <li>
                  <Link prefetch={false} href="/laundry-machines-reparatie">
                    Wasmachines
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/consoles-reparatie">
                    Consoles
                  </Link>
                </li>*/}
              </ul>
            </FooterSitemap>
            <FooterSitemap ClassName="custome-footer-sitename">
              <FooterSitemapTitle>Reparaties</FooterSitemapTitle>
              <ul>
                <li>
                  <Link
                    prefetch={false}
                    href="/zoek-een-reparateur?zip=&device=1&long=0&lat=0&distance=30&sort=8"
                  >
                    Telefoon reparatie
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/zoek-een-reparateur?zip=&device=2&long=0&lat=0&distance=30&sort=8"
                  >
                    Tablet reparatie
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/zoek-een-reparateur?zip=&device=3&long=0&lat=0&distance=30&sort=8"
                  >
                    Laptop reparatie
                  </Link>
                </li>
              </ul>
            </FooterSitemap>
            <FooterSitemap ClassName="custome-footer-sitename">
              <FooterSitemapTitle>Steden</FooterSitemapTitle>
              <ul>
                <li>
                  <Link prefetch={false} href="/amsterdam" as="/amsterdam">
                    Amsterdam
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/rotterdam">
                    Rotterdam
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/den-haag">
                    Den Haag
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/utrecht">
                    Utrecht
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/groningen">
                    Groningen
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/den-bosch">
                    Den Bosch
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/tilburg">
                    Tilburg
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/maastricht">
                    Maastricht
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/eindhoven">
                    Eindhoven
                  </Link>
                </li>
              </ul>
            </FooterSitemap>
          </FooterLinkArea>{" "}
          <FooterLinkArea className="footer-link-area">
            <FooterSitemap ClassName="custome-footer-sitename">
              {/* <FooterSitemapTitle>Devices</FooterSitemapTitle>
              <ul>
                <li>
                  <Link prefetch={false} href="/reparatie">
                    Smartphones
                  </Link>
                </li>
              </ul>*/}
            </FooterSitemap>
          </FooterLinkArea>
        </FooterViewContent>
      </DevicesContainer>{" "}
      <FooterCopyright>
        {" "}
        Copyright @ 2021 MrAgain - info@mragain.nl{" "}
      </FooterCopyright>
      {!!notBot && <CookieBanner />}
    </FooterViewSection>
  );
};
export default withUserAgent(FooterView);
