import { Drawer as AntDrawer } from "antd";
import Dialog from "rc-dialog";
import { connect } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { store } from "@/configureStore";
export function createModalModule() {
  const guid = uuid();

  function getModuleState(state) {
    return state.modal?.[guid];
  }

  return {
    guid,
    actions: {
      resolve() {},
      open(payload) {
        store.ref.dispatch({ type: "OPEN_MODAL", guid, payload });

        return {
          then: (resolve, reject) => {
            this.resolve = async (...args) => {
              try {
                await resolve(...args);
              } catch (err) {
                return;
              }
              this.close();
            };
            this.reject = (...args) => {
              reject?.(...args);
              this.close();
            };
          },
        };
      },
      close() {
        store.ref.dispatch({ type: "CLOSE_MODAL", guid });
      },
    },
    selectors: {
      get data() {
        return getModuleState(store.ref.getState())?.payload;
      },
      get isVisible() {
        return !!getModuleState(store.ref.getState());
      },
    },
  };
}

function DEFAULT_BUTTONS({ module, okText = "Submit" }) {
  return [
    <button key="cancel" onClick={() => module.actions.close()}>
      Cancel
    </button>,
    <button key="submit" onClick={() => module.actions.resolve?.()}>
      {okText}
    </button>,
  ];
}

const StyledDialog = styled(Dialog)`
  .rc-dialog-footer {
    display: flex;
    justify-content: center;
    border: 0 none;
    button {
      background: #ffffff;
      border: 1px solid #d9d9d9;
      box-sizing: border-box;
      box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
      border-radius: 72px;
      font-size: 16px;
      line-height: 24px;
      padding: 8px 16px;
      margin: 0 20px;

      &:nth-child(2) {
        background: #06c987;
        border: 1px solid #06c987;
        color: #fff;
      }
    }
  }

  .rc-dialog-body {
    text-align: center;
  }

  h2 {
    font-weight: 500;
    font-size: 17px;
    line-height: 16px;
    margin-bottom: 14px;
    text-align: center;
  }

  p {
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #909090;
    width: 70%;
    margin: 10px auto;
  }
`;

const Modal = connect((state, ownProps) => ({
  visible: ownProps.module.selectors.isVisible,
  onClose: ownProps.module.actions.close,
}))(function ({ module, footer = DEFAULT_BUTTONS, okText, ...rest }) {
  return (
    <StyledDialog
      className="custom-modal"
      {...rest}
      footer={footer?.({ module, okText })}
    />
  );
});

export const Drawer = connect((state, ownProps) => ({
  visible: ownProps.module.selectors.isVisible,
  onClose: ownProps.module.actions.close,
}))(function ({ ...rest }) {
  return <AntDrawer className="custom-drawer" {...rest} />;
});

export default Modal;
