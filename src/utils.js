export const findItem = (id, data) =>
  data.find((item) => {
    const itemId = typeof id !== "string" ? item.id : item.id.toString();
    return itemId === id;
  });

{
  /* Convert amount to Currency */
}

export const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

{
  /* Total products/amount reducers  */
}

export const productsReducer = (cartArray) => {
  const totalProducts = cartArray.reduce(
    (accumulator, currentValue) => (accumulator += currentValue.quantity),
    0
  );
  return totalProducts;
};

export const priceReducer = (cartArray) => {
  const totalPrice = cartArray.reduce(
    (accumulator, currentValue) =>
      (accumulator += currentValue.quantity * currentValue.price),
    0
  );
  return formatCurrency(totalPrice);
};

{
  /* Total cart amount function */
}

export const totalProductPrice = (data, cart) => {
  const findItem = cart.filter((item) => item.id === data.id);
  const totalItemPrice = findItem && priceReducer(findItem);
  return findItem ? formatCurrency(totalItemPrice) : "";
};

export const totalCartPrice = (data) => {
  return priceReducer(data);
};
