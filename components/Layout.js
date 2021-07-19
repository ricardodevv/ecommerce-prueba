import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const LayoutStyled = styled.div`
  .children {
    margin-top: 3rem;
  }
`;

const Layout = ({ pageTitle, children }) => {
  return (
    <LayoutStyled>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />
      <div className="children">{children}</div>
      <Footer />
    </LayoutStyled>
  );
};

export default Layout;
