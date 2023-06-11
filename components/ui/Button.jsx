import styled from "styled-components";

const Button = styled.button`
  background-color: #06c987;
  color: #fff;
  min-width: 130px;
  padding: 7px;
  height: 51px;
  line-height: 37px;
  border: 0;
  text-align: center;
  border-radius: 25px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
  box-shadow: 0 0 0 0 #fafafa, 0 0 0 4px rgba(0, 0, 0, 0), 0 0 0 0 #06c987;

  &:hover,
  &:focus {
    outline: none;
    transition: box-shadow linear 0.15s;
    box-shadow: 0 0 0 4px #fafafa, 0 0 0 4px rgba(0, 0, 0, 0), 0 0 0 5px #06c987;
  }

  &[disabled] {
    background-color: #a0a0a0;
  }

  &:hover {
    color: #fff;
  }
`;

export const TextButton = styled(Button)`
  background-color: transparent;
  color: #404040;
  min-width: auto;
  box-shadow: none;

  &:focus,
  &:hover {
    box-shadow: none;
    color: #06c987;
  }
`;

export default Button;
