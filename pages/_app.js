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
  const data = action.data;
  const existingItem = state.cart.find((item) => item.id === data.item.id);

  switch (action.type) {
    case "setItems":
      return { ...state, items: data.items };
    case "addToCart":
      return existingItem
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === data.item.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, data.item],
          };
    case "removeItem":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== data.item.id),
      };
    case "removeOneItem":
      return existingItem.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === data.item.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== data.item.id),
          };
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

export const addToCart = (item) => {
  return {
    type: "addToCart",
    data: {
      item,
    },
  };
};

export const removeItem = (item) => {
  return {
    type: "removeItem",
    data: {
      item,
    },
  };
};

export const removeOneItem = (item) => {
  return {
    type: "removeOneItem",
    data: {
      item,
    },
  };
};

const MyApp = ({ Component, pageProps }) => {
  //const [items, setItems] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [itemFounded, setitemFounded] = useState([]);

  const initialStore = {
    items: [],
    cart: [],
  };

  const [store, dispatch] = useReducer(itemReducer, initialStore);

  useEffect(() => {
    itemService.getItems().then((result) => dispatch(setItems(result.data)));
  }, []);

  console.log(store);

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

  const dispatchAddToCart = (id) => {
    const itemToAdd = findItem(id);

    const itemToCart = {
      ...itemToAdd,
      quantity: 1,
    };
    dispatch(addToCart(itemToCart));
  };

  const contextStorage = {
    store,
    searchItem,
    itemFounded,
    setsearchItem,
    setitemFounded,
    findSearchedItem,
    findItem,
    dispatch,
    dispatchAddToCart,
  };

  return (
    <ItemsContext.Provider value={contextStorage}>
      <Component {...pageProps} />
    </ItemsContext.Provider>
  );
};

export default MyApp;
