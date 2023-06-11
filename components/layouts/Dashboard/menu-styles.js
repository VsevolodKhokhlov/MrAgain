import styled from "styled-components";

export const MainWrap = styled.div`
  background-color: #fafafa;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContentWrap = styled.div`
  background-color: #f3f3f3;
  flex: 1;
  display: flex;
`;

export const PageContent = styled.div`
  padding: 24px 24px 24px 24px;
  flex: 1;
  height: calc(100vh - 68px);
  overflow: auto;
`;

export const MenuWrap = styled.div`
  height: 100%;
  background-color: #fff;
  padding: 16px;
  color: #909090;
  font-size: 12px !important;
  height: calc(100vh - 68px);
  overflow: auto;

  .ant-tree > li {
    position: relative;
    padding: 13px 0 11px 0 !important;

    span:hover {
      background-color: transparent;
    }
  }
  .ant-tree-switcher {
    position: absolute !important;
    width: 100% !important;
    height: 38px !important;

    span {
      position: absolute !important;
      top: 8px !important;
      right: 0 !important;
    }
  }

  .ant-tree-icon__customize {
    margin-right: 10px !important;
    color: #ddd;
  }

  .ant-tree > li > span:first-child {
    position: absolute;
    right: 0;
  }

  .ant-tree > li > ul {
    padding: 14px 0 0 16px;
  }
  .ant-tree > li > ul > li {
    border-left: solid 2px #e0e0e0;
    padding: 13px 0 11px 15px !important;
  }

  .ant-tree > li.ant-tree-treenode-selected {
    background: rgb(251, 191, 36);
    background: linear-gradient(
      0deg,
      rgba(251, 191, 36, 0) calc(100% - 50px),
      rgba(240, 255, 249, 1) calc(100% - 50px),
      rgba(240, 255, 249, 1) 50px
    );
    border-left: none !important;
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

export const MenuHeader = styled.p`
  display: block;
  font-size: 8px;
  line-height: 10px;
  color: #3090b4;
  margin: 25px 0 12px 12px;
`;
