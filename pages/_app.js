import React, { useState, useEffect, useReducer } from "react";
import "../styles/globals.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Layout from "../components/Layout";
import itemService from "../services/items";
import { StateProvider } from "../components/StateProvider";
import { initialStore } from "../reducer";

export const ItemsContext = React.createContext();

const MyApp = ({ Component, pageProps }) => {
  const findSearchedItem = (toSearch) => {
    return store.items.filter(
      (el) => el.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1
    );
  };

  const findItem = (id) =>
    store.items.find((item) => {
      const itemId = typeof id !== "string" ? item.id : item.id.toString();
      return itemId === id;
    });

  return (
    <StateProvider reducer={reducer} initialStore={initialStore}>
      <Component {...pageProps} />
    </StateProvider>
  );
};

export default MyApp;
