import { addToCart } from "./reducer";

export const dispatchAddToCart = (item, dispatch) => {
  const itemToAdd = item;

  const itemToCart = {
    ...itemToAdd,
    quantity: 1,
  };
  dispatch(addToCart(itemToCart));
};
