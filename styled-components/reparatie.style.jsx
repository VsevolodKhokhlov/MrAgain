import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleArea = styled.div`
  flex: 1 1 587px;
  width: 100%;
  background-color: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(/telefoon-reparatie-mragain.jpg);
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 570px) {
    flex: 1 1 400px;
    justify-content: flex-end;
    padding-bottom: 30px;
  }
`;

export const BenefitsArea = styled.div`
flex: 1 1 591px;
width 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
@media (max-width: 570px) {
  flex: 1 1 340px;
}
`;

export const TestimonialArea = styled.div`
flex: 1 1 490px;
width 100%;
background-color: #F1FEFA;
margin-bottom: -45px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
@media (max-width: 570px){
  flex: 1 1 400px;
}
`;

export const Title = styled.h1`
  font-size: 45px;
  color: #FFFFFF;
  font-weight: 700;
  font-family: "Montserrat";
  color: white;
  padding-left: 120px;
  @media (max-width: 570px) {
    font-size: 25px;
    padding-left: 40px;
  }
`;

export const BookBtn = styled.button`
  width: 182px;
  height: 50px;
  border-radius: 50px;
  background-color: #19cd8f;
  color: white;
  font-size: 11px;
  color: #ffffff;
  font-weight: 600;
  font-family: "Montserrat";
  border: none;
  margin-left: 120px;
  @media (max-width: 570px) {
    margin-left: 40px;
  }
`;

export const BenefitsSub = styled.h2`
  font-size: 13px;
  letter-spacing: 1px;
  color: #0076a3;
  font-weight: 600;
  font-family: "Dosis";

  @media (max-width: 570px) {
    font-size: 12px;
  }
`;

export const BenefitsTitle = styled.h1`
  font-size: 30px;
  color: #0d3244;
  font-weight: 500;
  font-family: "Montserrat";

  @media (max-width: 570px) {
    font-size: 15px;
  }
`;

export const BenefitsOuterWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const BenefitsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TestimonialWrapper = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 570px) {
    flex-direction: column;
  }
`;

export const Spacer = styled.div`
  flex: 0 10 120px;
  width: 120px;
  min-width: 20px;

  @media (max-width: 570px) {
    flex: 0 10 40px;
  }
`;
