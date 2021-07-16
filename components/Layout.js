import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const LayoutStyled = styled.div`
  .children {
    margin-top: 3rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutStyled>
      <Header />
      <div className="children">{children}</div>
      <Footer />
    </LayoutStyled>
  );
};

export default Layout;
