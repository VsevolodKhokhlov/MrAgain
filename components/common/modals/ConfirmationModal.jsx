import Image from "next/image";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Button from "@/components/ui/Button";
import Modal from "@/modules/modal";

const TYPE_TO_IMAGE_PATH = {
  error: "/images/notifications/error.png",
  warning: "/images/notifications/warning.png",
  success: "/images/notifications/success.png",
};

const TYPE_TO_COLOR = {
  error: "#ce2029",
  warning: "#ffd300",
  success: "#06c987",
};

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h3 {
    font-size: 25px;
    color: ${(props) => TYPE_TO_COLOR[props.modalType] || "#555"};
    font-weight: 500;
    margin: 35px 0 25px;
  }

  p {
    font-size: 15px;
    color: #707070;
    font-weight: 400;
  }
`;

function ConfirmationModal({ module, moduleData, resolve, ...rest }) {
  const { type, message, description, buttonLabel } = moduleData;
  function renderConfirmationType() {
    if (!type) {
      return null;
    }
    return (
      <Image
        loading="eager"
        width={201}
        height={201}
        src={TYPE_TO_IMAGE_PATH[type]}
      />
    );
  }

  return (
    <Modal {...rest} module={module} footer={null} title={null}>
      <MainWrap modalType={type}>
        {renderConfirmationType()}
        <h3>{message}</h3>
        <p>{description}</p>
        {buttonLabel ? <Button onClick={resolve}>{buttonLabel}</Button> : null}
      </MainWrap>
    </Modal>
  );
}

export default connect(
  (state, ownProps) => ({
    moduleData: ownProps.module.selectors.data || {},
  }),
  (_, ownProps) => ({
    resolve: async () => {
      await ownProps.module.actions.resolve();
      ownProps.module.actions.close();
    },
  })
)(ConfirmationModal);
