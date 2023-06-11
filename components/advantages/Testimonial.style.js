import styled from "styled-components";

export const TestimonialBox = styled.div`
  display: flex;
  width: 400px;
  height: 200px;
  box-shadow: 0px 1px 5px hsl(0deg 0% 89%);
  border-radius: 8px;
  background-color: white;
  padding: 31px 31px;
  margin: 12px 12px 12px 0;
  @media (max-width: 570px) {
    width: 250px;
    height: 120px;
    padding: 15px;
  }
`;
export const TestimonialTitle = styled.h1`
  font-size: 16px;
  color: #0d3244;
  font-weight: 500;
  font-family: "Montserrat";
  padding-right: 32px;
  padding-bottom: 10px;

  @media (max-width: 570px) {
    font-size: 11px;
    padding-bottom: 0px;
  }
`;

export const TestimonialText = styled.div`
  font-size: 12px;
  color: #0d3244;
  font-weight: 300;
  font-family: "Montserrat";
  line-height: 1.4;
  @media (max-width: 570px) {
    font-size: 8px;
  }
`;

export const TestimonialName = styled(TestimonialText)`
  margin-top: auto;
  font-weight: 500;
`;

export const TextWrapper = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

export const StarsQuoteWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  &:after {
    content: "”";
    font-size: 70px;
    position: absolute;
    bottom: -22px;
    color: #2875bc;
  }

  @media (max-width: 570px) {
    &:after {
      content: "”";
      font-size: 35px;
      position: absolute;
      bottom: -3px;
      color: #2875bc;
    }
  }
`;

export const GoldStar = styled.div`
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjEzcHgiIGhlaWdodD0iMTNweCIgdmlld0JveD0iMCAwIDEzIDEzIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zICgxMTk3MCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+U2hhcGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0ib3JhbmdlLXN0YXIiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9IiNGNjhCMjQiPgogICAgICAgICAgICA8ZyBpZD0iUGFnZS0xIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJzdGFyX2JpZyI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuNSwwLjQgTDguNSw0LjQgTDEyLjUsNC42IEw5LjUsOCBMMTAuNSwxMi4zIEw2LjUsOS45IEwyLjYsMTIuMyBMMy41LDggTDAuNSw0LjYgTDQuNSw0LjMgTDYuNSwwLjQiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=");
  background-repeat: repeat-x;
  width: 66px;
  height: 12px;
`;
