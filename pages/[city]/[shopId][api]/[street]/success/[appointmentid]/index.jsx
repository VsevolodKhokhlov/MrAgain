import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSingleAppointment } from "service/appointments/operations.js";
import styled from "styled-components";

import DefaultLayout from "@/components/layouts/Homepage";
import { getShopProfileByInformationServer } from "@/service/account/operations";

const index = (props) => {
  const { name, street, st_number, city } = props.shop;

  const [appointment, setAppointment] = useState(null);
  const router = useRouter();
  const { appointmentid } = router.query;

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchAppointment(id) {
      if (!id) return null;
      const res = await getSingleAppointment(id, () => console.log("dispatch"));
      setAppointment(res.pop());
    }
    fetchAppointment(appointmentid);
  }, []);

  return (
    <>
      <DefaultLayout style={{ padding: "0" }}>
        <PageContainer>
          <AppointmentBody>
            <ImageContainer>
              <Image
                src={"/images/notifications/appointment.png"}
                width={200}
                height={200}
              />
            </ImageContainer>
            <Title>Afspraak details</Title>
            <Subtitle>
              Je afspraak is succesvol gemaakt, we hebben een bevestigingsmail
              naar je verzonden{" "}
            </Subtitle>
            {!!appointment && (
              <Details>
                <Row>
                  <LeftSide>Reparateur & locatie</LeftSide>
                  <RightSide>
                    {name}
                    <br />
                    {street}&nbsp;{st_number},&nbsp;{city}
                  </RightSide>
                </Row>
                <Row>
                  <LeftSide>Datum & tijd</LeftSide>
                  <RightSide>
                    {appointment.appointment.date || "No date"}{" "}
                  </RightSide>
                </Row>

                <HorizontalLine />
                <Row>
                  <LeftSide>Jouw gegevens</LeftSide>
                  <RightSide>
                    {appointment.appointment.client_name} <br />
                    {appointment.appointment.client_email} <br />
                    {appointment.appointment.client_phone}
                  </RightSide>
                </Row>

                <HorizontalLine />
                <Row>
                  <LeftSide>Jouw apparaat</LeftSide>
                  <RightSide>
                    {appointment.device.device_name}

                    <br />
                    {appointment.brand.brand_name}
                    <br />
                    {appointment.model.model_name}
                  </RightSide>
                </Row>

                <HorizontalLine />
                <Row>
                  <LeftSide>Reparatie & prijs</LeftSide>
                  <RightSide>
                    {" "}
                    {appointment.reparation.reparation_name}{" "}
                  </RightSide>
                </Row>
                {appointment.appointment.appointment_comment && (
                  <>
                    <HorizontalLine />
                    <Row>
                      <LeftSide>Comment</LeftSide>
                      <RightSide>
                        {" "}
                        {appointment.appointment.appointment_comment}{" "}
                      </RightSide>
                    </Row>
                  </>
                )}
              </Details>
            )}
          </AppointmentBody>
        </PageContainer>
      </DefaultLayout>
    </>
  );
};

export default index;

const PageContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AppointmentBody = styled.div`
  font-size: 32px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Title = styled.div`
  font-size: 25px;
  color: #06c987;
  font-weight: 500;
  margin: 25px 0;
`;
const Subtitle = styled.div`
  font-size: 20px;
  color: #06c987;
  font-weight: 500;
  margin: 5px 0;
  padding: 0 50px;
  text-align: center;
`;

const Details = styled.div`
  margin: 50px auto 10px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const LeftSide = styled.div`
  color: #707070;
  font-weight: 300;
  font-size: 13px;
`;

const RightSide = styled.div`
  color: #303030;
  font-weight: 500;
  font-size: 13px;
  text-align: right;
`;

const HorizontalLine = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top-color: currentcolor;
  border-top-style: none;
  border-top-width: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export async function getServerSideProps(ctx) {
  const shopId = ctx.query["shopId][api"];
  const shopProfileServerInfo = await getShopProfileByInformationServer(shopId);
  return {
    props: {
      shop:
        shopProfileServerInfo && shopProfileServerInfo[0]
          ? shopProfileServerInfo[0]
          : shopProfileServerInfo,
    },
  };
}
