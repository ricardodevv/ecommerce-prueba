export const initialStore = {
  cart: [],
  orders: [],
};

const reducer = (state, action) => {
  const data = action.data;
  const existingCartItem = state.cart.find((item) => item.id === data.item.id);

  switch (action.type) {
    case "addToCart":
      return existingCartItem
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
      return existingCartItem.quantity > 1
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
    case "removePurchased":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== data.item.id),
      };
    case "buy":
      return {
        ...state,
        orders: [...state.orders, data.item],
      };
    default:
      state;
  }
};

export default reducer;

{
  /* State actions */
}

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

export const removePurchased = (item) => {
  return {
    type: "removePurchased",
    data: {
      item,
    },
  };
};

export const checkout = (item) => {
  return {
    type: "checkout",
    data: {
      item,
    },
  };
};
