import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BACK_END_URL } from "constants.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled, { css } from "styled-components";

import { MaxConstraints } from "@/components/styled/layout";
import Button from "@/components/ui/Button";
import { TextButton } from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import media from "@/utils/media";

const HeaderWrap = styled.div`
  display: flex;
  height: 71px;
  border-bottom: 2px solid #f0f0f0;
  background-color: #fff;
  z-index: 1;
  align-items: center;
  padding-top: 1px;

  ${media.tablet`
    height: 99px;
  `}
`;

const MainMenuWrap = styled.div`
  height: 53px;
  display: none;
  align-items: center;
  position: relative;
  background-color: #fff;
  z-index: 1;
  margin-left: -13px;

  ${media.desktop`
    display: flex;
  `}

  a {
    font-size: 10px;
    color: #404040;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    margin: 0 13px;
    letter-spacing: 1px;
  }
`;

const HeaderInnerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserMenuWrap = styled.div`
  align-items: center;

  ${(props) =>
    props.hiddenOnMobile &&
    css`
      display: none;
    `}

  ${media.desktop`
    display: flex;
  `}

  .svg-inline--fa {
    margin-right: 10px;
    color: #c9c9c9;
  }

  > * {
    margin: 0 10px;
  }
`;

const HamburgerWrap = styled.div`
  font-size: 21px;

  ${media.desktop`
    display: none;
  `}
`;

const MobileMenuCloseMask = styled.div`
  z-index: 900;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: none;
  ${(props) =>
    props.visible &&
    css`
      display: block;
    `}
`;

const MobileMenuWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 0%;
  overflow: hidden;
  height: 100%;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.95);
  color: #555;
  white-space: nowrap;
  z-index: 1000;

  ${(props) =>
    props.shouldExpand &&
    css`
      width: 90%;
    `}
  transition: width 0.3s ease-out;
`;

const MobileMenuHeader = styled.div`
  height: 99px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
`;

const MobileMenuLinks = styled.div`
  a {
    display: block;
    padding: 10px 20px;
    color: #555;
    border-bottom: 1px solid #ddd;
  }
`;

const LANG_OPTIONS = [
  {
    value: "en",
    label: "EN",
  },
  {
    value: "nl",
    label: "NL",
  },
];

function SignupButtons({ hiddenOnMobile, showSignup }) {
  function renderButtons() {
    if (!showSignup) {
      return null;
    }
    return (
      <>
        <Link href="/login">
          <TextButton as="a">
            <FontAwesomeIcon icon={faUser} />
            Log in
          </TextButton>
        </Link>
        <Link href="/meld-je-aan-als-reparateur">
          <Button as="a">Registreer</Button>
        </Link>
      </>
    );
  }
  return (
    <UserMenuWrap hiddenOnMobile={hiddenOnMobile}>
      {renderButtons()}
      <Select value="nl" aria-label="Language" options={LANG_OPTIONS} />
    </UserMenuWrap>
  );
}

function HeaderLinks() {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/over-ons">Over ons</Link>
      <Link href="/reparatie">Reparatie</Link>
      <Link href="/meld-je-aan-als-reparateur">Meld je aan als reparateur</Link>
      <Link href="/contact-met-mragain">Contact</Link>
      <Link href="/veel-gestelde-vragen">FAQ</Link>
      <Link href="/blog">Blog</Link>
      {/*<Link href="/over-reparaties">Reparaties</Link>*/}
    </>
  );
}

const HeaderView = ({ showSignup }) => {
  const [isMenuVisible, updateMenuVisibility] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuVisible ? "hidden" : "auto";
  }, [isMenuVisible]);

  return (
    <>
      <HeaderWrap>
        <MaxConstraints>
          <HeaderInnerWrap>
            <a className="logo" href="/">
              <Image
                quality={100}
                loading={"eager"}
                priority={true}
                width={104}
                height={40}
                src="/images/mragain.svg"
                alt="Logo Mr Again"
              />
            </a>
            <SignupButtons hiddenOnMobile showSignup={showSignup} />
            <HamburgerWrap>
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => updateMenuVisibility((state) => !state)}
              />
              <MobileMenuCloseMask
                visible={isMenuVisible}
                onClick={() => updateMenuVisibility(false)}
              />
              <MobileMenuWrapper shouldExpand={isMenuVisible}>
                <MobileMenuHeader>
                  <a className="logo" href="/">
                    <Image
                      quality={100}
                      loading={"eager"}
                      priority={true}
                      width={104}
                      height={40}
                      src="/images/mragain.svg"
                      alt="Logo Mr Again"
                    />
                  </a>
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => updateMenuVisibility(false)}
                  />
                </MobileMenuHeader>
                <SignupButtons showSignup={showSignup} />
                <MobileMenuLinks>
                  <HeaderLinks />
                </MobileMenuLinks>
              </MobileMenuWrapper>
            </HamburgerWrap>
          </HeaderInnerWrap>
        </MaxConstraints>
      </HeaderWrap>
      <MainMenuWrap>
        <MaxConstraints>
          <HeaderLinks />
        </MaxConstraints>
      </MainMenuWrap>
    </>
  );
};

export default HeaderView;
