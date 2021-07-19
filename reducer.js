export const initialStore = {
  items: [],
  cart: [],
};

const reducer = (state, action) => {
  const data = action.data;
  const existingItem = state.cart.find((item) => item.id === data.item.id);

  switch (action.type) {
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

export default reducer;

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
