import styled from "styled-components";

export const MainWrapper = styled.div`
  display: flex;
  height: 70vh;
  margin: 20px 0px -127px 0px;
  @media (max-width: 1024px) {
    margin-top: 0px;
  }
`;

export const FormWrapper = styled.div`
  position: relative;
  background: white;
  padding: 20px 100px 20px 100px;
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    padding: 0px;
    align-items: center;
  }
`;

export const WaveWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
`;

export const DrawingWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 242px;
  height: 160px;
  margin: auto;
`;

export const RightSide = styled.div`
  background: #f0fff9;
  border-radius: 10px;
  height: 100%;
`;
export const FormTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  padding-bottom: 10px;
  @media (max-width: 1024px) {
    color: #3ec986;
  }
`;
export const FormText = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 15px;
`;
export const FormBox = styled.div`
  width: 100%;
  height: 58%;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const LabelWrapper = styled.div`
  position: relative;
  margin: 15px 0px 15px 0px;
  width: 350px;
}
  &:nth-child(2) {
    margin-bottom: 50px;
  }

  @media (max-width: 1024px) {
    width: 280px;
  }
`;

export const Label = styled.label`
  display: block;
  width: 90%;
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
  position: relative;
`;

export const Button = styled.button`
  background-color: rgb(6, 201, 135);
  color: rgb(255, 255, 255);
  min-width: 165px;
  padding: 7px;
  margin-top: 18px;
  height: 51px;
  line-height: 37px;
  border: 0px;
  text-align: center;
  border-radius: 25px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
  box-shadow: rgb(250 250 250) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 4px,
    rgb(6 201 135) 0px 0px 0px 0px;
  @media (max-width: 1024px) {
    width: 85%;
  }
`;

export const EyeWrapper = styled.div`
  position: absolute;
  top: 18px;
  right: 23px;
  z-index: 2;
`;

export const BottomText = styled.div`
  display: flex;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  margin-top: auto;
  margin-bottom: 30px;
  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }
`;

export const BottomTextATag = styled(BottomText)`
  color: #06c987;
  padding-left: 5px;
  cursor: pointer;
`;

export const ForgotPass = styled.a`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  margin-left: 20px;
  color: #909090;
  @media (max-width: 1024px) {
    margin: 20px 0px 10px 0px;
  }
`;

export const Gradient = styled.div`
  background: linear-gradient(#ffffff, #f0fff9);
  height: 300px;
`;

export const ButtonWrapper = styled.div`
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
