import React, { createContext, useContext, useReducer } from "react";
import { setItems } from "../reducer";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialStore, children, data }) => {
  const findSearchedItem = (toSearch) => {
    return items.filter(
      (el) => el.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1
    );
  };

  const findItem = (id) =>
    items.find((item) => {
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

  const dispatchSetItems = (data) => {
    dispatch(setItems(data));
  };

  return (
    <StateContext.Provider value={useReducer(reducer, initialStore)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
