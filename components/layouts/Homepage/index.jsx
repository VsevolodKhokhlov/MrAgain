import React from "react";
import styled from "styled-components";

import { Footer } from "@/components/global";

import Header from "./Header";

const ContentWrap = styled.div`
  background-color: #fafafa;
  padding-bottom: 127px;
`;

export default function DefaultLayout({ children, showSignup = false }) {
  return (
    <>
      <Header showSignup={showSignup} />
      <ContentWrap>{children}</ContentWrap>
      <Footer />
    </>
  );
}
