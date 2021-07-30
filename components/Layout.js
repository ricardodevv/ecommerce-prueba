import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />
      <div style={{ margin: "3em auto 6em auto", maxWidth: "1400px" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
