import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Layout from "../components/Layout";
import itemService from "../services/items";

export const ItemsContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [items, setItems] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [itemFounded, setitemFounded] = useState([]);
  const [cartItems, setcartItems] = useState([]);

  useEffect(() => {
    itemService.getItems().then((result) => setItems(result.data));
  }, []);

  const findItem = (toSearch) => {
    return items.filter(
      (el) => el.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1
    );
  };

  const contextStorage = {
    items,
    searchItem,
    itemFounded,
    cartItems,
    setsearchItem,
    setitemFounded,
    setcartItems,
    findItem,
  };

  return (
    <ItemsContext.Provider value={contextStorage}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ItemsContext.Provider>
  );
}

export default MyApp;
