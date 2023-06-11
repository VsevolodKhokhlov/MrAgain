import React from "react";
import styled from "styled-components";

import Loader from "@/components/common/Loader";
import { useFetcher } from "@/modules/dataFetcher";
import media, { OnMobile } from "@/utils/media";

import SliderOnMobile from "../common/SliderOnMobile";
import { SubTitle } from "../styled/text";
import { appointmentStats } from "./modules";

const Wrap = styled.div`
  border-radius: 10px;
  width: 100%;
  ${SubTitle} {
    display: none;
    border-bottom: 1px solid #ddd;
    line-height: 43px;
    padding: 0 24px;
  }

  ${media.desktop`
    background-color: #fff;
    width: 56%;
    ${SubTitle} {
      display: block;
    }
  `}
`;

const Divider = styled.div`
  border: 1px solid #f3f3f3;
  margin: 0 16px;
  height: 64px;
  display: none;

  ${media.desktop`
    display: block;
  `}
`;

const StatsNumbers = styled.div`
  stat {
    background: #ffffff;
    border-radius: 10px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px;
    width: 136px;
    height: 136px;
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  count {
    font-style: normal;
    font-weight: 600;
    color: #404040;
    display: block;
    font-size: 18px;
    line-height: 24px;
  }

  label {
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    color: #909090;
  }

  ${media.tablet`
    display: flex;
    margin: 0 -16px;
    max-width: 100%;
    padding: 30px 40px;
    margin: 0;
    overflow-x: auto;

    stat {
      border-radius: 0;
      margin: 0;
      width: auto;
      height: auto;
      padding: 0;
      display: block;
    }

    count {
      font-size: 20px;
      line-height: 26px;
    }
  `}
`;

export default function Stats() {
  const { data, isLoading } = useFetcher({
    dataFetcher: appointmentStats,
  });

  function renderContent() {
    if (isLoading || !data) {
      return <Loader />;
    }

    return (
      <>
        <OnMobile only>
          <StatsNumbers>
            <SliderOnMobile
              slidesToShow={2}
              slidesToScroll={2}
              centerPadding="20px"
            >
              <stat>
                <count>{data.today}</count>
                <label>Afspraken vandaag</label>
              </stat>
              <stat>
                <count>{data.new}</count>
                <label>Nieuwe afspraken</label>
              </stat>
              <stat>
                <count>{data.upcoming}</count>
                <label>Komende afspraken</label>
              </stat>
              <stat>
                <count>{data.completed}</count>
                <label>Afgeronde afspraken</label>
              </stat>
            </SliderOnMobile>
          </StatsNumbers>
        </OnMobile>
        <OnMobile show={false}>
          <StatsNumbers>
            <stat>
              <count>{data.today}</count>
              <label>Afspraken vandaag</label>
            </stat>
            <Divider />
            <stat>
              <count>{data.new}</count>
              <label>Nieuwe afspraken</label>
            </stat>
            <Divider />
            <stat>
              <count>{data.upcoming}</count>
              <label>Komende afspraken</label>
            </stat>
            <Divider />
            <stat>
              <count>{data.completed}</count>
              <label>Afgeronde afspraken</label>
            </stat>
          </StatsNumbers>
        </OnMobile>
      </>
    );
  }

  return (
    <Wrap>
      <SubTitle>Statistieken</SubTitle>
      {renderContent()}
    </Wrap>
  );
}
