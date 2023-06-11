import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import styled from "styled-components";

import Loader from "@/components/common/Loader";
import { useFetcher } from "@/modules/dataFetcher";
import { Drawer } from "@/modules/modal";
import media, { OnMobile } from "@/utils/media";

import { SubTitle } from "../styled/text";
import { notificationsModal, recentActivity } from "./modules";

const Wrap = styled.div`
  width: 40%;
  background-color: #fff;
  border-radius: 10px;

  ${SubTitle} {
    border-bottom: 1px solid #ddd;
    line-height: 43px;
    padding: 0 24px;
  }
`;

const MessagesWrap = styled.div`
  margin-top: 50px;

  ${media.desktop`
    margin-top: 0;
    max-height: 200px;
    overflow-y: auto;
    padding: 5px 24px;
  `}
`;

const MessageWrap = styled.div`
  padding: 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #909090;
  margin: 8px 0;

  border: 1px solid #e0e0e0;
  border-radius: 10px;

  strong {
    display: flex;
    justify-content: space-between;
    letter-spacing: -0.02em;
    color: #404040;
    font-weight: 600;

    em {
      font-weight: normal;
      font-style: normal;
      white-space: nowrap;
      font-size: 12px;
      color: #c0c0c0;
    }
  }

  ${media.desktop`
    border: none;
    padding: 8px;
    border-radius: 0;
    margin: 5px 0;
  `}
`;

const NotificationsBell = styled.div`
  position: relative;
`;

const NTYPE_TO_TITLE = {
  "New appointment": "Nieuwe afspraak",
  "New inquiry": "Nieuw bericht",
  "New Review": "Nieuwe review",
};

export default function Notifications() {
  const { data, isLoading } = useFetcher({
    dataFetcher: recentActivity,
  });

  function renderNotification(notification) {
    console.log(notification.n_type);
    return (
      <MessageWrap>
        <strong>
          <span>{NTYPE_TO_TITLE[notification.n_type]}</span>
          <em>{moment(notification.created_at).format("DD-MM-YY")}</em>
        </strong>
        {notification.message}
      </MessageWrap>
    );
  }

  function renderContent() {
    if (isLoading) {
      return <Loader />;
    }

    return <MessagesWrap>{(data || []).map(renderNotification)}</MessagesWrap>;
  }

  return (
    <>
      <OnMobile only>
        <NotificationsBell onClick={() => notificationsModal.actions.open()}>
          <FontAwesomeIcon icon={faBell} />
        </NotificationsBell>
        <Drawer width="100%" module={notificationsModal}>
          <SubTitle>Notificaties</SubTitle>
          {renderContent()}
        </Drawer>
      </OnMobile>
      <OnMobile show={false}>
        <Wrap>
          <SubTitle>Notificaties</SubTitle>
          {renderContent()}
        </Wrap>
      </OnMobile>
    </>
  );
}
