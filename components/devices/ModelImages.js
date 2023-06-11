import Image from "next/image";
import React, { useMemo, useState } from "react";
import styled, { css } from "styled-components";

import media, { OnMobile } from "@/utils/media";

import SliderOnMobile from "../common/SliderOnMobile";

const MainWrap = styled.div`
  margin: 0 -20px;
  display: flex;

  ${media.tablet`
    margin: 0;
  `}
`;

const MainImagePreview = styled.div`
  width: 100%;
  height: 440px;
  position: relative;
  background-color: #fafafa;
  margin-bottom: 36px;

  ${media.tablet`
    border-radius: 10px;
    margin-right: 50px;
    margin-bottom: 0px;
    width: 540px;
    height: 540px;
  `}
`;

const ImagePickWrap = styled.div`
  display: none;
  flex-direction: column;
  margin: -5px 20px -5px 0;

  ${media.tablet`
    display: flex;
  `}
`;

const Thumb = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  background-color: #fafafa;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: 0 0 0 2px #28a745;
    `}
`;

const SliderWrap = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 440px;
  margin: 10px;
`;

export function ModelImages({ data }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = useMemo(() => {
    return JSON.parse((data || "[]").replace(/'/g, '"'));
  }, []);

  return (
    <>
      <OnMobile only>
        <SliderOnMobile>
          {images.map((image, index) => (
            <SliderWrap>
              <Image layout="fill" objectFit="contain" src={image} />
            </SliderWrap>
          ))}
        </SliderOnMobile>
      </OnMobile>
      <OnMobile show={false}>
        <MainWrap>
          <ImagePickWrap>
            {images.map((image, index) => (
              <Thumb
                isActive={index === currentImage}
                onClick={() => setCurrentImage(index)}
              >
                <Image layout="fill" objectFit="contain" src={image} />
              </Thumb>
            ))}
          </ImagePickWrap>
          <MainImagePreview>
            {images[currentImage] ? (
              <Image
                layout="fill"
                objectFit="contain"
                src={images[currentImage]}
              />
            ) : null}
          </MainImagePreview>
        </MainWrap>
      </OnMobile>
    </>
  );
}
