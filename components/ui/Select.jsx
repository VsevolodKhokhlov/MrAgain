import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select as AntdSelect } from "antd";
import styled from "styled-components";

const StyledSelect = styled(AntdSelect)`
  display: block;

  * {
    font-size: 12px !important;
  }

  .ant-select {
    &:focus {
      outline: none;
    }
  }

  .ant-select-selection {
    border: 0;
  }

  .ant-select-arrow {
    margin-top: -5px;
    .svg-inline--fa {
      margin-right: 0;
      font-size: 8px;
      color: #06c987;
    }
  }
`;

export default function Select({ options, ...rest }) {
  function renderOption(option) {
    return (
      <AntdSelect.Option key={option.value} value={option.value}>
        {option.label}
      </AntdSelect.Option>
    );
  }

  return (
    <StyledSelect
      {...rest}
      suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
    >
      {(options || []).map(renderOption)}
    </StyledSelect>
  );
}
