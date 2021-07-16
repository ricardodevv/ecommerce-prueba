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
    case "setItems":
      return { ...state, items: action.data.items };
    case "addToCart":
      return { ...state, cart: [...state.cart, action.data] };
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
    type: "addToCart",
    data: {
      item,
      quantity,
    },
  };
};

const MyApp = ({ Component, pageProps }) => {
  //const [items, setItems] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [itemFounded, setitemFounded] = useState([]);

  useEffect(() => {
    itemService.getItems().then((result) => dispatch(setItems(result.data)));
  }, []);

  const initialStore = {
    items: [],
    cart: [],
  };

  const [store, dispatch] = useReducer(itemReducer, initialStore);

  const findItem = (toSearch) => {
    return store.items.filter(
      (el) => el.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1
    );
  };

  const contextStorage = {
    store,
    searchItem,
    itemFounded,
    setsearchItem,
    setitemFounded,
    findItem,
    dispatch,
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
