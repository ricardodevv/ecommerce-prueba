import React from "react";
import "../styles/globals.css";
import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { StateProvider } from "../components/StateProvider";
import reducer, { initialStore } from "../context/reducer";

const MyApp = ({ Component, pageProps }) => {
  return (
    <StateProvider reducer={reducer} initialStore={initialStore}>
      <Component {...pageProps} />
    </StateProvider>
  );
};

export default MyApp;
