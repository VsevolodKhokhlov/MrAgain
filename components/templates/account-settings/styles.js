import { Row } from "antd";
import styled from "styled-components";

import { Field } from "@/modules/forms/Blocks";

export const FieldWrapper = styled(Field)``;

export const HeaderSmallText = styled.p`
  display: block;
  font-size: 12px;
  line-height: 10px;
  color: #3090b4;
  padding: 32px 32px 10px 32px;
`;

export const BoxWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
`;

export const BoxWrapperContent = styled.div`
  padding: ${(props) => (props.paddingY ? " 24px 32px" : "0 32px")};
`;

export const ButtonsWrapper = styled.div`
  padding: 0 32px 24px 32px;
  display: flex;
  justify-content: space-between;
`;

export const RowWrapper = styled(Row)`
  border-radius: 14px;
  overflow: hidden;
  display: flex;
`;

export const HoursEditor = styled.div`
  background: #fafafa;
  width: 100%;
  height: 100%;
`;
