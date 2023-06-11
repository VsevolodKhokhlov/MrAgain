import "./AppointmentDirectly.less";

import { Checkbox } from "antd";
// import DayPicker from "react-day-picker";
import { DatePicker } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { connect } from "react-redux";
import { getAccountProfile } from "service/account/operations.js";
import { setAppointmentDate } from "service/appointments/action.js";

const AppointmentDirectly = (routerProps) => {
  const [app_date, setDateTime] = useState();
  const [chkW, setChkWait] = React.useState(true);
  const [chkM, setChkMatrial] = React.useState(true);
  const [chkP, setChkPro] = React.useState(true);
  const [chkG, setChkGuarantee] = React.useState(true);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [disabledDates, setDisabledDates] = useState([]);
  const [enabledDates, setEnabledDates] = useState([]);
  const [disabledDatesflg, setDisabledDatesflg] = useState(false);

  const router = useRouter();

  const {
    account_invalid_time,
    account_valid_time,
    account_profile,
    setAppointmentDate,
  } = routerProps;

  if (disabledDatesflg === false) {
    if (Object.keys(account_invalid_time).length !== 0) {
      let temp = JSON.parse(account_invalid_time);
      let closeDates = [];
      let openDates = [];
      temp.map((el) => {
        if (el.open_close_time === "-") {
          closeDates.push(el.checkDay);
        } else {
          openDates.push(el.checkDay);
        }
        return true;
      });
      setDisabledDates(closeDates);
      setEnabledDates(openDates);
      setDisabledDatesflg(true);
    }
  }

  const disabledDate = (date) => {
    let m = moment(date);
    let str = m.format("YYYY-MM-DD");
    let timestamp = moment(str, "YYYY-MM-DD").valueOf();

    let ret = false;

    if (Object.keys(account_valid_time).length === 0) {
      return true;
    }

    disabledDates.map((el) => {
      if (el === timestamp) {
        ret = true;
      }
      return true;
    });
    if (ret === true) {
      return true;
    }

    let flg = false;
    enabledDates.map((el) => {
      if (el === timestamp) {
        flg = true;
      }
      return true;
    });
    if (flg === true) {
      return false;
    }

    let now_day = date.day();
    let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let valid_times = JSON.parse(account_valid_time);
    let _times = valid_times[dayArr[now_day]];

    if (_times.length === 0 || _times === "CLOSED" || _times === "Gesloten") {
      return true;
    }
    return false;
  };

  function onChkWait(e) {
    setChkWait(e.target.checked);
  }

  function onChkMatrial(e) {
    setChkMatrial(e.target.checked);
  }

  function onChkPro(e) {
    setChkPro(e.target.checked);
  }

  function onChkGuarantee(e) {
    setChkGuarantee(e.target.checked);
  }

  function selectDate(date) {
    let m = moment(date);
    let str = m.format("YYYY-MM-DD");
    let timestamp = moment(str, "YYYY-MM-DD").valueOf();

    let current = new Date();
    let m_cur = moment(current);
    let str_cur = m_cur.format("YYYY-MM-DD");
    let timestamp_cur = moment(str_cur, "YYYY-MM-DD").valueOf();

    if (timestamp < timestamp_cur) {
      alert(
        "You can select time later than the current date. please select the correct day."
      );
      return;
    }

    setAppointmentDate(date);
    let flg = 1;
    router.push(
      `/maak-een-afspraak?shop=${account_profile.id}&initdate=${flg}`
    );
  }
  let dateArr = [];
  let closeDateArr = [];
  if (Object.keys(account_invalid_time).length !== 0) {
    let temp = JSON.parse(account_invalid_time);
    temp.map((el) => {
      if (el.open_close_time !== "-") {
        dateArr.push(new Date(el.checkDay));
      } else {
        closeDateArr.push(new Date(el.checkDay));
      }
      return true;
    });
  }

  const modifiers = {
    sunday: { daysOfWeek: [0] },
    saturday: { daysOfWeek: [6] },
    invalid: dateArr,
    closed: closeDateArr,
  };

  const modifiersStyles = {
    sunday: {
      color: "red",
      borderLeft: "none",
    },
    saturday: {
      color: "blue",
      borderRight: "none",
    },
    invalid: {
      color: "white",
      backgroundColor: "orange",
    },
    closed: {
      color: "white",
      backgroundColor: "red",
    },
  };

  return (
    <div className="appointment-directly">
      <div className="appointment-directly-wrap">
        <div className="adw-title">Maak direct een afspraak</div>
        <div className="adw-content">
          <div className="adw-calendar">
            <DatePicker
              disabledDate={(date) => disabledDate(date)}
              onChange={(date) => selectDate(date)}
              value={app_date}
              allowClear={true}
              autoFocus={true}
              open={true}
            />
            {/* <DayPicker
              selectedDays={selectedDay}
              onDayClick={selectDate}
              month={new Date()}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
            /> */}
          </div>
          <div className="adw-other-check">
            <div className="adw-other-check-wrap">
              <Checkbox checked={chkW} onChange={(e) => onChkWait(e)}>
                Geen wachttijden
              </Checkbox>
              <Checkbox checked={chkM} onChange={(e) => onChkMatrial(e)}>
                Altijd materialen op voorraad
              </Checkbox>
              <Checkbox checked={chkP} onChange={(e) => onChkPro(e)}>
                Snelle reparatietijd
              </Checkbox>
              <Checkbox checked={chkG} onChange={(e) => onChkGuarantee(e)}>
                Altijd de beste garantie
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  account_invalid_time: state.account.account_invalid_time,
  account_valid_time: state.account.account_valid_time,
  account_profile: state.account.shop_account_profile,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getAccountProfile: (id) => {
      getAccountProfile(id, dispatch);
    },
    setAppointmentDate: (date) => {
      dispatch(setAppointmentDate(date));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentDirectly);
