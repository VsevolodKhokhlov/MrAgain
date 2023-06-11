import moment from "moment";
import React from "react";
import styled from "styled-components";

import { useFormContext } from "@/modules/forms";

//

// TODO: copied from BookingInfo
const ServiceDetails = styled.section`
  strong {
    font-size: 12px;
    color: #303030;
    font-weight: 500;
    margin-left: 4px;
  }

  label {
    margin: 0;
  }

  > div {
    display: flex;
  }
`;

const ServiceDetailsWrap = styled.div`
  display: flex;
  padding-bottom: 7px;
  border-bottom: 3px solid #fafafa;
  margin-bottom: 17px;
`;

const USER_FIELDS = ["name", "email", "tel"];
const DATE_FIELDS = ["date"];
const FIELDS_LABELS = {
  name: "Naam",
  email: "Email",
  tel: "Telefoon nummer",
  date: "Datum & tijdstip",
};

function Section({ fields, showTitle }) {
  const { values } = useFormContext().state;

  const shouldRender = fields.some((field) => values[field]);

  if (!shouldRender) {
    return null;
  }

  function renderField(name) {
    if (!values[name]) {
      return null;
    }

    function formatValue() {
      if (name === "date") {
        return `${values.time ? values.time : ""} ${moment(values.date).format(
          "dddd, DD MMMM YYYY"
        )}`;
      }

      return values?.[name];
    }

    return (
      <div>
        <label>{FIELDS_LABELS[name]}: </label>
        <strong>{formatValue()}</strong>
      </div>
    );
  }

  return (
    <>
      {showTitle ? <h5>Jouw gegevens</h5> : null}
      <ServiceDetailsWrap>
        <ServiceDetails>{fields.map(renderField)}</ServiceDetails>
      </ServiceDetailsWrap>
    </>
  );
}

export default function UserInfo({ showDate = true }) {
  return (
    <>
      <Section fields={USER_FIELDS} showTitle />
      {showDate ? <Section fields={DATE_FIELDS} /> : null}
    </>
  );
}
