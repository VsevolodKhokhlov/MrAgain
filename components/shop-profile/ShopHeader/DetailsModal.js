import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import styled from "styled-components";

import Loader from "@/components/common/Loader";
import { SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import { withData } from "@/modules/dataFetcher";
import Modal from "@/modules/modal";
import { DAY_TO_FULL_NAME, DAYS_OF_WEEK } from "@/utils/date";

import { openTimeFetcher, shopInfo } from "../modules";

const ScheduleSection = styled.section`
  margin-top: 40px;
`;

const DayWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Schedule = withData({
  dataFetcher: openTimeFetcher,
  Component({ data, isLoading }) {
    if (isLoading) {
      return <Loader />;
    }

    if (!data) {
      return null;
    }

    return (
      <ScheduleSection>
        <SubTitle as="h3">Onze openingstijden</SubTitle>
        {DAYS_OF_WEEK.map((day) => (
          <DayWrap key={day}>
            <span>{DAY_TO_FULL_NAME[day]}</span>
            {data[day]}
          </DayWrap>
        ))}
      </ScheduleSection>
    );
  },
});

export default function DetailsModal({ shop }) {
  const showDetailsModal = useCallback(() => {
    shopInfo.actions.open();
    openTimeFetcher.fetch();
  });

  return (
    <>
      <Button onClick={showDetailsModal}>
        <FontAwesomeIcon icon={faInfo} />
      </Button>
      <Modal
        module={shopInfo}
        footer={null}
        title={<SubTitle as="h3">Over {shop.name}</SubTitle>}
      >
        <p>{shop.about_us}</p>
        <Schedule />
      </Modal>
    </>
  );
}
