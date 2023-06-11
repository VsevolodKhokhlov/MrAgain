import { Switch } from "antd";
import styled from "styled-components";

import { Text } from "../Text/Text";

const SwitchGroupWrapper = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 10px;

    h4 {
      margin-bottom: 2px;
    }

    p {
      margin: 0;
    }
  }
`;

export const SwitchGroup = ({ title, description, ...rest }) => (
  <SwitchGroupWrapper>
    <Switch {...rest} />
    <div>
      <Text.Headline size="14" weight="regular" style={{ margin: 0 }}>
        <b>{title}</b>
      </Text.Headline>
      <Text.Body size="12" style={{ margin: 0 }}>
        {description}
      </Text.Body>
    </div>
  </SwitchGroupWrapper>
);
