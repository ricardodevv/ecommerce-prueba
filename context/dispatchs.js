import { addToCart, checkout, removePurchased } from "./reducer";

export const dispatchAddToCart = (item, dispatch) => {
  const itemToAdd = item;

  const itemToCart = {
    ...itemToAdd,
    quantity: 1,
  };
  dispatch(addToCart(itemToCart));
};

export const dispatchCheckout = (cart, dispatch) => {
  const order = cart.map((item) => {
    const { inventory, ...rest } = item;
    return rest;
  });
  dispatch(checkout(order));

  const deleteItem = order.map((item) => dispatch(removePurchased(item)));
  deleteItem;
};
