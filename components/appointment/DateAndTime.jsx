import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar, Tooltip } from "antd";
import moment from "moment";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";

import { useFetcher } from "@/modules/dataFetcher";
import { Field } from "@/modules/forms/Blocks";
import { DAYS_OF_WEEK } from "@/utils/date";
import media from "@/utils/media";

import { SubTitle } from "../styled/text";
import {
  appointmentForm,
  invalidTimeFetcher,
  openTimeFetcher,
} from "./modules";

const ShortDayWrap = styled.div`
  background-color: #a0a0a0;
  width: 6px;
  height: 6px;
  position: absolute;
  top: 3px;
  left: 50%;
  margin-left: -3px;
  z-index: 100;
  border-radius: 3px;
  border: 1px solid #ddd;
`;

const DatePickerWrap = styled.div`
  background-color: #fff;
  margin: 0 -20px;
  padding: 1px 20px;

  header {
    height: 71px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin: 0 -20px 10px;
    padding: 0 20px;
  }

  h4 {
    margin-bottom: 0;
  }

  &&&&& .ant-select {
    width: auto;
  }

  .ant-radio-group {
    display: none;
  }

  .ant-fullcalendar-date {
    position: relative;
  }

  .ant-fullcalendar-selected-day {
    ${ShortDayWrap} {
      background-color: #fff;
    }
  }

  .ant-fullcalendar-content {
    position: static;
  }

  .ant-fullcalendar-value {
    width: 35px;
    height: 35px;
    border-radius: 18px;
    line-height: 35px;
    font-size: 13px;
  }

  .ant-fullcalendar-next-month-btn-day:not(.ant-fullcalendar-disabled-cell)
    .ant-fullcalendar-value {
    color: rgba(0, 0, 0, 0.65);
  }

  .ant-fullcalendar {
    border: none;

    th {
      line-height: 33px;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      color: #a0a0a0;
      font-size: 11px;
    }
  }

  ${media.tablet`
    margin: 40px 0 0 0;
    border-radius: 10px;
    padding: 1px 41px;

    header {
      margin: 0 -41px 20px;
    }

    .ant-fullcalendar-value {
      width: 45px;
      height: 45px;
      border-radius: 27px;
      line-height: 45px;
      font-size: 13px;
    }
  `}
`;

function CalendarField({ value, onChange }) {
  const invalidTimes = useFetcher({ dataFetcher: invalidTimeFetcher });
  const openedTimes = useFetcher({ dataFetcher: openTimeFetcher });

  const shortDays = useMemo(() => {
    if (!invalidTimes.data) {
      return [];
    }
    return invalidTimes.data.map((time) => ({
      date: moment(time.checkDay),
      scheduele: time.open_close_time,
      reason: time.reason,
    }));
  }, [invalidTimes.data]);

  return (
    <Calendar
      fullscreen={false}
      value={moment(value)}
      disabledDate={(date) => {
        const now = moment();
        const isBefore = date.isBefore(now);
        if (isBefore) {
          return true;
        }
        const day = date.isoWeekday();

        const isClosed =
          !openedTimes?.data?.[DAYS_OF_WEEK[day - 1]] ||
          ["gesloten", "closed"].includes(
            openedTimes?.data?.[DAYS_OF_WEEK[day - 1]]?.toLowerCase()
          );
        return isClosed;
      }}
      onSelect={(value) => onChange(moment(value).toString())}
      onPanelChange={(value) => onChange(moment(value).toString())}
      dateCellRender={(date) => {
        const short = shortDays.find((shortDay) =>
          date.isSame(shortDay.date, "day")
        );
        if (!short) {
          return null;
        }
        return (
          <Tooltip title={short.reason}>
            <ShortDayWrap />
          </Tooltip>
        );
      }}
    />
  );
}

const TimeOption = styled.div`
  font-size: 13px;
  letter-spacing: 1px;
  color: #303030;
  font-weight: 500;
  height: 45px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #ddd;
  line-height: 43px;
  cursor: pointer;
  margin: 6px 10px;
  width: 90px;
  position: relative;

  ${media.tablet`
    margin: 6px 10px;
    width: 115px;
  `}

  .fa-check-circle {
    font-size: 20px;
    color: #06c987;
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 1;
  }

  &:after {
    position: absolute;
    top: 0;
    width: 8px;
    height: 9px;
    background-color: #fff;
    content: "";
    right: -2px;
    display: none;
  }

  &:hover {
    box-shadow: 0 0 0 2px #06c987;
  }

  ${(props) =>
    props.isSelected &&
    css`
      box-shadow: 0 0 0 2px #06c987;
      &:after {
        display: block;
      }
    `}
`;

const TimeFrames = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -7px;

  ${media.tablet`
    overflow-y: auto;
    max-height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 0;
    padding: 10px 0;
  `}
`;

const SchedueleContentWrap = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  flex-direction: column;
  margin-bottom: 20px;

  > div:nth-child(1) {
    width: 100%;
  }

  ${media.tablet`
    height: 380px;
    flex-direction: row;

    > div:nth-child(1) {
      width: auto;
      flex-grow: 1;
      margin-right: 30px;
    }

    > div:nth-child(2) {
      height: 100%;
      margin: 0;
      display: flex;
      flex-direction: column;
    }
  `}
`;

function TimePicker({ value, onChange }) {
  const invalidTimes = useFetcher({ dataFetcher: invalidTimeFetcher });
  const openedTimes = useFetcher({ dataFetcher: openTimeFetcher });
  const selectedDate = moment(appointmentForm.state.values.date);

  const shortDays = useMemo(() => {
    if (!invalidTimes.data) {
      return [];
    }
    return invalidTimes.data.map((time) => ({
      date: moment(time.checkDay),
      scheduele: time.open_close_time,
      reason: time.reason,
    }));
  }, [invalidTimes.data]);

  const shortDayHours = useMemo(() => {
    const dayMeta = shortDays.find((shortDay) =>
      selectedDate.isSame(shortDay.date, "day")
    );
    return dayMeta?.scheduele;
  }, [selectedDate]);

  const regularHours = useMemo(() => {
    const day = selectedDate.isoWeekday();
    return openedTimes?.data?.[DAYS_OF_WEEK[day - 1]];
  });
  const openedInterval = shortDayHours ? shortDayHours : regularHours;
  const [min, max] = openedInterval?.split("-") || [];

  const hours = useMemo(() => {
    if (!min || !max) {
      return [];
    }

    return Array.from({ length: 24 })
      .map((_, index) => `${index < 10 ? `0${index}` : index}:00`)
      .filter((time) => {
        let [h] = time.split(":");
        let [hMin] = min.split(":");
        let [hMax] = max.split(":");

        [h, hMin, hMax] = [h, hMin, hMax].map((hour) => parseInt(hour, 10));

        return h >= hMin && h <= hMax;
      });
  }, [min, max]);

  return (
    <TimeFrames>
      {hours.map((hour) => {
        const isSelected = value === hour;
        return (
          <TimeOption isSelected={isSelected} onClick={() => onChange(hour)}>
            {hour}
            {isSelected ? <FontAwesomeIcon icon={faCheckCircle} /> : null}
          </TimeOption>
        );
      })}
    </TimeFrames>
  );
}

export default function DateAndTime({ required = true }) {
  return (
    <DatePickerWrap>
      <header>
        <SubTitle>
          Kies een dag en tijd voor je reparatie{" "}
          {required ? "" : "(Let op: dit kan nog wijzigen)"}
        </SubTitle>
      </header>
      <SchedueleContentWrap>
        <Field
          name="date"
          as={CalendarField}
          onChange={(value) => {
            appointmentForm.actions.onFieldChange({ name: "date", value });
            appointmentForm.actions.onFieldChange({ name: "time", value: "" });
          }}
          css={`
            & .ant-select.ant-fullcalendar-year-select.ant-select-sm {
              background: papayawhip;
            }
          `}
        />
        <Field name="time" as={TimePicker} />
      </SchedueleContentWrap>
    </DatePickerWrap>
  );
}
