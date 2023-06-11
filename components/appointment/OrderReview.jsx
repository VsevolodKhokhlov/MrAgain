import moment from "moment";
import Image from "next/image";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Modal from "@/modules/modal";
import media from "@/utils/media";

import { appointmentReview } from "./modules";

const ContentWrap = styled.div`
  text-align: center;
  h3 {
    font-size: 25px;
    color: #06c987;
    font-weight: 500;
    margin: 25px 0;
  }

  d-list {
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    margin: 50px auto 10px;
    font-size: 13px;
  }

  d-term {
    display: block;
    width: 50%;
    color: #303030;
    font-weight: 500;
    margin-bottom: 10px;
  }

  d-def {
    display: block;
    width: 50%;
    color: #707070;
    font-weight: 300;
  }

  hr {
    width: 100%;
  }

  ${media.tablet`
    d-list {
      width: 450px;
    }
  `}
`;

const AppointmentReviewModalContent = connect(() => ({
  modalData: appointmentReview.selectors.data,
}))(({ modalData }) => {
  if (!modalData) {
    return null;
  }

  return (
    <ContentWrap>
      <Image
        loading="eager"
        width={201}
        height={200}
        src="/images/notifications/appointment.png"
      />
      <h3>Afspraak details</h3>
      <d-list>
        <d-def>Reparateur & locatie</d-def>
        <d-term>
          {modalData.form.shopName} <br /> {modalData.form.shopAddress}
        </d-term>
        <d-def>Datum & tijd</d-def>
        <d-term>
          {modalData.form.time}{" "}
          {moment(modalData.form.date).format("dddd, DD MMMM YYYY")}
        </d-term>
        <hr />
        <d-def>Jouw gegevens</d-def>
        <d-term>
          {modalData.form.name} <br />
          {modalData.form.email} <br />
          {modalData.form.tel}
        </d-term>
        {modalData.device || modalData.brand || modalData.model ? (
          <>
            <hr />
            <d-def>Jouw apparaat</d-def>
            <d-term>
              {modalData.device?.device_name} <br />
              {modalData.brand?.brand_name} <br />
              {modalData.model?.model_name}
            </d-term>
          </>
        ) : null}
        {modalData.service ? (
          <>
            <hr />
            <d-def>Reparatie & prijs</d-def>
            <d-term>
              {modalData.service?.reparation.reparation_name}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&euro;
              {modalData.service?.price}
            </d-term>
          </>
        ) : null}
      </d-list>
    </ContentWrap>
  );
});

export default function OrderReview() {
  return (
    <Modal module={appointmentReview} footer={null}>
      <AppointmentReviewModalContent />
    </Modal>
  );
}
