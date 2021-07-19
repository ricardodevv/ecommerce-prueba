export const dispatchAddToCart = (id) => {
  const itemToAdd = findItem(id);

  const itemToCart = {
    ...itemToAdd,
    quantity: 1,
  };
  dispatch(addToCart(itemToCart));
};
