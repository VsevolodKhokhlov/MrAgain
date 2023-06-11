import { Icon, Spin } from "antd";
import styled from "styled-components";

const antIcon = <Icon type="loading" spin />;
const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

export default function Loader() {
  return (
    <LoaderWrap>
      <Spin indicator={antIcon} />
    </LoaderWrap>
  );
}
