import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import media from "@/utils/media";

import { Modals } from ".";
import Menu from "./Menu";

const HeaderWrap = styled.div`
  display: flex;
  min-height: 64px;
  border-bottom: 2px solid #f0f0f0;
  background-color: #fff;
  z-index: 1;
  align-items: center;
  padding: 1px 32px;
  box-sizing: content-box;

  ${media.tablet`
    height: 64px;
  `}
`;

const HeaderInnerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > a {
    display: flex;
    align-items: center;
  }
`;

const HamburgerWrap = styled.div`
  font-size: 21px;
  margin-right: 21px;

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

export function MobileMenu({ children }) {
  const [isMenuVisible, updateMenuVisibility] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuVisible ? "hidden" : "auto";
  }, [isMenuVisible]);

  return (
    <HamburgerWrap>
      <FontAwesomeIcon
        icon={faBars}
        onClick={() => updateMenuVisibility((state) => !state)}
      />
      <Modals.Source multiple>
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
          <MobileMenuLinks>{children}</MobileMenuLinks>
        </MobileMenuWrapper>
      </Modals.Source>
    </HamburgerWrap>
  );
}

const HeaderView = () => {
  return (
    <>
      <HeaderWrap>
        <MobileMenu>
          <Menu />
        </MobileMenu>
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
        </HeaderInnerWrap>
      </HeaderWrap>
    </>
  );
};

export default HeaderView;
