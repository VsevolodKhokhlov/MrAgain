import { Row } from "antd";
import styled from "styled-components";

export const RowWrapper = styled.div`
  display: flex;
  background: white;
  border-radius: 10px;
  overflow: auto;
  height: calc(100vh - 250px);
`;

export const RowModelsWrapper = styled(Row)`
  padding: 20px;
`;

export const RowWrapperMargin = styled(Row)`
  margin: 16px 0;
`;

export const TransferWrapper = styled.div`
  border-left: 1px solid lightgray;
  height: 100%;
`;

export const MenuWrap = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  background-color: #fff;
  color: #909090;
  font-size: 12px !important;
  overflow: auto;

  .ant-tree > li {
    position: relative;
    padding: 22px !important;
    border-bottom: solid 1px lightgray;
  }
  .ant-tree-switcher {
    position: absolute !important;
    width: 100% !important;
    height: 38px !important;

    span {
      position: absolute !important;
      top: 8px !important;
      right: 16px !important;
    }
  }

  .ant-tree-icon__customize {
    margin-right: 10px !important;
  }

  .ant-tree > li > span:first-child {
    position: absolute;
    right: 0;
  }

  .ant-tree > li > ul {
    padding: 14px 0 0 24px;
  }
  .ant-tree > li > ul > li {
    border-left: solid 2px #e0e0e0;
    padding: 13px 0 11px 30px !important;
  }

  .device-icon {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  .ant-tree > li.ant-tree-treenode-selected {
    border-left: none !important;

    .device-icon {
      background: rgba(6, 201, 135, 0.5);
    }
  }

  .ant-tree-treenode-selected {
    border-left: solid 2px #06c987 !important;
  }
  .ant-tree-node-selected {
    background-color: transparent !important;
    color: black !important;
  }

  .ant-tree-switcher-noop {
    display: none !important;
  }
`;

export const ModelWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border-radius: 6px;
  display: flex;
  background: #fafafa;
  align-items: center;
  justify-content: space-between;
`;

export const RowActionsWrapper = styled(Row)`
  padding: 20px;
  border-bottom: solid 1px lightgray;
  align-items: center;

  h3 {
    margin: 0;
  }
`;

export const HeaderSmallText = styled.p`
  display: block;
  font-size: 16px;
  line-height: 10px;
  color: #3090b4;
  margin: 0;
`;

export const NoItemsSelected = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BrandImage = styled.img`
  width: auto;
  height: 20px;
  margin: 5px 10px 5px 0;
`;
