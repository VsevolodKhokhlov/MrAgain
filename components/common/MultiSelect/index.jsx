import { Select } from "antd";
import styled from "styled-components";

const { Option } = Select;

const MultiSelectWrapper = styled.div`
  .ant-select-selection--multiple {
    border: none;
  }
  .ant-select-selection--multiple .ant-select-selection__choice {
    border-radius: 16px;
    height: 32px;
    margin: 0;
    margin-right: 16px;
    background: #f0fff9;
    border-color: #f0fff9;
    color: #06c987;
  }
  .ant-select-selection--multiple .ant-select-selection__choice__disabled {
    position: absolute;
    right: 0;
    background: #f3f3f3;
    border-color: #f3f3f3;
    color: inherit;
  }

  ant-select {
    &:focus {
      box-shadow: none !important;
      outline: none !important;
    }
  }

  .ant-select-selection__choice__content {
    margin-right: 16px;
  }

  .ant-select-arrow {
    top: calc(50% - 4px) !important;

    svg {
      width: 1.1rem !important;
      height: 1.1rem !important;
    }
  }
`;

const renderChildren = (optionItems) => {
  return optionItems.map((option) => (
    <Option key={option.value}>{option.label}</Option>
  ));
};

export const MultiSelect = ({ placeholder, onChange, value, options }) => {
  return (
    <MultiSelectWrapper>
      <Select
        mode="multiple"
        maxTagCount={3}
        size="large"
        showArrow
        defaultValue={value}
        style={{ width: "100%" }}
        placeholder={placeholder || "Maak je keuze"}
        onChange={onChange}
        tokenSeparators={[","]}
      >
        {renderChildren(options)}
      </Select>
    </MultiSelectWrapper>
  );
};
