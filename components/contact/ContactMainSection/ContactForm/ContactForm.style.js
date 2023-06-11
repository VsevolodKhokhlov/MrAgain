import styled from "styled-components";

export const FormWrapper = styled.div`
  position: relative;
  height: 630px;
  width: 460px;
  background: white;
  box-shadow: 0px 2px 20px hsl(0deg 0% 89%);
  border-radius: 24px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 375px;
    border-radius: 0px;
  }
  isolation: isolate;
  z-index: 1;
`;
export const FormTitle = styled.div`
  text-transform: uppercase;
  padding: 10px 0px;
  padding-bottom: 32px;
  font-size: 13px;
  letter-spacing: 1px;
  color: #0076a3;
  font-weight: 600;
  font-family: "Dosis";

  &:after {
    position: absolute;
    content: "";
    border-bottom: 1px solid hsl(0deg 0% 89%);
    top: 74px;
    left: 0px;
    width: 100%;
  }
`;
export const FormText = styled.div`
  padding: 30px 0px;
  padding-right: 50px;
  font-size: 12px;
  color: #303030;
  font-weight: 400;
  font-family: "Montserrat";
  @media (max-width: 768px) {
    padding-right: 0px;
  }
`;
export const FormBox = styled.div`
  width: 100%;
  height: 100%;
`;

export const LabelWrapper = styled.div`
  position: relative;

  &:first-of-type {
  }

  &:nth-of-type(5) {
    :after {
      position: absolute;
      top: 43px;
      left: 17px;
      content: "+31";
      font-size: 11px;
      color: #a0a0a0;
      font-weight: 400;
      font-family: "Montserrat";
      z-index: 2;
    }
  }
`;

export const Label = styled.label`
  display: block;
  width: 90%;
  padding: 13px 0px 4px 0px;
  margin: -13px 0px 0px 0px;
  background: white;
  position: absolute;
  top: 25px;
  left: 17px;
  font-size: 11px;
  color: #a0a0a0;
  font-weight: 400;
  font-family: "Montserrat";
  z-index: 1;
`;

export const TextInput = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid hsl(0, 0%, 89%);
  border-bottom-width: 1px;
  padding: 32px 6px 6px 17px;
  border-radius: 5px;
  font-size: 13px;
  color: #303030;
  font-weight: 500;
  font-family: "Montserrat";
`;

export const NumberInput = styled.input`
  display: block;
  width: 100%;
  border: 1px solid hsl(0, 0%, 89%);
  border-bottom-width: 1px;
  padding: 32px 6px 6px 40px;
  border-radius: 5px;
  font-size: 13px;
  color: #303030;
  font-weight: 500;
  font-family: "Montserrat";
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid hsl(0, 0%, 89%);
  border-bottom-width: 1px;
  padding: 32px 6px 6px 17px;
  border-radius: 3px;
  font-size: 13px;
  color: #303030;
  font-weight: 500;
  font-family: "Montserrat";
  resize: none;
  overflow: auto;
  flex: 1 1 150px;
`;

export const Button = styled.button`
  position: absolute;
  bottom: -27px;
  left: 44px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #3ec986;
  padding: 0;
  border: none;
  z-index: 1;
`;

export const FlexHelper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  gap: 3px;
`;
