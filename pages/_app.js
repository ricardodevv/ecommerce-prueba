import React, { useState, useEffect, useReducer } from "react";
import "../styles/globals.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Layout from "../components/Layout";
import itemService from "../services/items";

export const ItemsContext = React.createContext();

const itemReducer = (state, action) => {
  switch (action.type) {
    case "addCart":
      return state.concat(action.data);
    case "removeCart":
      return "";
    case "buy":
      return "";
    default:
      break;
  }
};

export const setItems = (items) => {
  return {
    type: "setItems",
    data: {
      items,
    },
  };
};

export const addToCart = (item, quantity) => {
  return {
    type: "addCart",
    data: {
      item,
      quantity,
    },
  };
};

const MyApp = ({ Component, pageProps }) => {
  const [items, setItems] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [itemFounded, setitemFounded] = useState([]);
  const cartItems = [];

  useEffect(() => {
    itemService.getItems().then((result) => setItems(result.data));
  }, []);

  const [state, dispatch] = useReducer(itemReducer, cartItems);

  const findItem = (toSearch) => {
    return items.filter(
      (el) => el.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1
    );
  };

  console.log(state);

  const contextStorage = {
    items,
    state,
    searchItem,
    itemFounded,
    setsearchItem,
    setitemFounded,
    findItem,
    dispatch,
    addToCart,
  };

  return (
    <ItemsContext.Provider value={contextStorage}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ItemsContext.Provider>
  );
};

export default MyApp;
